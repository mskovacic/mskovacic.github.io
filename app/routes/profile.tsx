import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { supabase } from '~/helpers/auth';

function getAuthProviders(user: User): string[] {
    const identityProviders = user.identities?.map((identity) => identity.provider) ?? [];
    const metadataProviders = user.app_metadata.providers;
    const providers = identityProviders.length > 0
        ? identityProviders
        : Array.isArray(metadataProviders)
            ? metadataProviders.filter((provider): provider is string => typeof provider === 'string')
            : typeof user.app_metadata.provider === 'string'
                ? [user.app_metadata.provider]
                : [];

    return [...new Set(providers)];
}

function formatProvider(provider: string): string {
    if (provider === 'azure') return 'Microsoft Azure';
    return provider.charAt(0).toUpperCase() + provider.slice(1);
}

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [pageError, setPageError] = useState<string | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    useEffect(() => {
        let isActive = true;

        void supabase.auth.getUser().then(({ data, error }) => {
            if (!isActive) return;
            if (error) {
                setPageError(error.message);
            } else {
                setUser(data.user);
            }
            setIsLoading(false);
        }).catch(() => {
            if (isActive) {
                setPageError('Unable to load your profile. Please try again.');
                setIsLoading(false);
            }
        });

        return () => {
            isActive = false;
        };
    }, []);

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        setDeleteError(null);

        try {
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (sessionError || !session?.access_token) {
                setDeleteError('Your session has expired. Sign in again before deleting your account.');
                return;
            }

            const { error } = await supabase.functions.invoke('delete-account', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${session.access_token}`,
                },
            });
            if (error) {
                let message = error.message || 'Unable to delete your account. Please try again.';
                if (error.context instanceof Response) {
                    const responseBody = await error.context.clone().json().catch(() => null) as { error?: unknown } | null;
                    if (typeof responseBody?.error === 'string') message = responseBody.error;
                }
                setDeleteError(message);
                return;
            }

            await supabase.auth.signOut({ scope: 'local' });
            navigate('/', { replace: true });
        } catch {
            setDeleteError('Unable to delete your account right now. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    const providers = user ? getAuthProviders(user) : [];

    if (!isLoading && !user) {
        return <Navigate to="/" replace />;
    }

    return (
        <Box component="main" sx={{ maxWidth: 760, mx: 'auto', px: 2, py: 5 }}>
            <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
                Profile
            </Typography>

            {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CircularProgress size={24} />
                    <Typography>Loading profile…</Typography>
                </Box>
            ) : pageError ? (
                <Alert severity="error" sx={{ mb: 2 }}>{pageError}</Alert>
            ) : (
                <Stack spacing={3}>
                    <Paper variant="outlined" sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>Account</Typography>
                        <Typography color="text.secondary">{user?.email ?? 'No email available'}</Typography>

                        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Authentication providers</Typography>
                        {providers.length > 0 ? (
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {providers.map((provider) => (
                                    <Chip key={provider} label={formatProvider(provider)} />
                                ))}
                            </Box>
                        ) : (
                            <Typography color="text.secondary">No linked providers were found.</Typography>
                        )}
                    </Paper>

                    <Paper variant="outlined" sx={{ p: 3, borderColor: 'error.light' }}>
                        <Typography variant="h6" color="error" sx={{ mb: 1 }}>Delete account</Typography>
                        <Typography color="text.secondary" sx={{ mb: 2 }}>
                            Permanently delete your Supabase account and sign out of this device.
                        </Typography>
                        <Button color="error" variant="contained" onClick={() => {
                            setDeleteError(null);
                            setDeleteDialogOpen(true);
                        }}>
                            Delete account
                        </Button>
                    </Paper>
                </Stack>
            )}

            <Dialog
                open={deleteDialogOpen}
                onClose={() => !isDeleting && setDeleteDialogOpen(false)}
                aria-labelledby="delete-account-title"
            >
                <DialogTitle id="delete-account-title">Delete your account?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This permanently removes your Supabase Auth account. You will need to sign up again to use this account.
                    </DialogContentText>
                    {deleteError && <Alert severity="error" sx={{ mt: 2 }}>{deleteError}</Alert>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} disabled={isDeleting}>
                        Cancel
                    </Button>
                    <Button color="error" variant="contained" onClick={() => void handleDeleteAccount()} disabled={isDeleting}>
                        {isDeleting ? 'Deleting…' : 'Delete account'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
