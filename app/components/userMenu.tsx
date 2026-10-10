import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import type { Session } from '@supabase/supabase-js';
import React from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { signInWithAzure, signUpWithAzure, supabase } from '~/helpers/auth';


const settings = ['Profile'];

const loginKey = 'Login | Sign up';

export default function UserMenu() {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [session, setSession] = React.useState<Session | null | undefined>(undefined);
    const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
    const [signUpOpen, setSignUpOpen] = React.useState(false);
    const [signUpEmail, setSignUpEmail] = React.useState('');
    const [signUpError, setSignUpError] = React.useState<string | null>(null);
    const [isSigningUp, setIsSigningUp] = React.useState(false);

    React.useEffect(() => {
        let isMounted = true;
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            setSession(nextSession);
        });

        void supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
            if (isMounted) {
                setSession(currentSession);
            }
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    React.useEffect(() => {
        const providerToken = session?.provider_token;
        setAvatarUrl(null);
        if (!providerToken) {
            return;
        }

        let isActive = true;
        let objectUrl: string | null = null;

        const loadProfilePhoto = async () => {
            try {
                const response = await fetch('https://graph.microsoft.com/v1.0/me/photos/48x48/$value', {
                    headers: { Authorization: `Bearer ${providerToken}` },
                });
                if (!response.ok) {
                    return;
                }

                const photo = await response.blob();
                if (isActive) {
                    objectUrl = URL.createObjectURL(photo);
                    setAvatarUrl(objectUrl);
                }
            } catch {
                // Keep the default account icon when Graph has no available photo.
            }
        };

        void loadProfilePhoto();
        return () => {
            isActive = false;
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [session?.provider_token]);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenSignUp = () => {
        handleCloseUserMenu();
        setSignUpError(null);
        setSignUpOpen(true);
    };

    const handleSignUp = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSignUpError(null);
        setIsSigningUp(true);

        try {
            const { error } = await signUpWithAzure(signUpEmail);
            if (error) {
                const isAlreadyRegistered = error.code === 'user_already_exists'
                    || error.code === 'email_exists'
                    || /already registered|already exists/i.test(error.message);

                setSignUpError(isAlreadyRegistered
                    ? 'This account is already registered. Close this dialog and choose Login to continue.'
                    : error.message || 'Unable to start Azure sign-up. Please try again.');
            }
        } catch {
            setSignUpError('Unable to start Azure sign-up right now. Please try again.');
        } finally {
            setIsSigningUp(false);
        }
    };

    const handleUserMenuItemClick = async (setting: string) => {
        handleCloseUserMenu();
        if (setting === loginKey) {
            const { error } = await signInWithAzure();
            if (error) {
                toast.error(error.message || 'Unable to continue with Microsoft sign-in. Please try again.');
            }
        } else if (setting === 'Sign up') {
            handleOpenSignUp();
        } else if (setting === 'Profile') {
            navigate('/profile');
        } else if (setting === 'Logout') {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Failed to sign out:', error);
            }
        }
    };

    const menuItems = [
        ...(session ? [...settings, 'Logout'] : session === null ? [loginKey] : []),
    ];

    return (
        <>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: '#fff' }} size="large">
                    <Avatar
                        alt={session?.user.user_metadata.full_name ?? 'Profile'}
                        src={avatarUrl ?? undefined}
                        sx={{ width: 40, height: 40, bgcolor: 'transparent', color: '#fff' }}
                    >
                        <AccountCircleIcon sx={{ fontSize: 40, color: '#fff' }} />
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {session?.user.email && (
                    <MenuItem disabled sx={{ opacity: '1 !important', cursor: 'default' }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                            sx={{ maxWidth: 240 }}
                        >
                            {session.user.email}
                        </Typography>
                    </MenuItem>
                )}
                {menuItems.map((setting) => (
                    <MenuItem key={setting} onClick={() => void handleUserMenuItemClick(setting)}>
                        <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
            <Dialog
                open={signUpOpen}
                onClose={() => !isSigningUp && setSignUpOpen(false)}
                fullWidth
                maxWidth="xs"
                aria-labelledby="sign-up-title"
            >
                <form onSubmit={(event) => void handleSignUp(event)}>
                    <DialogTitle id="sign-up-title">Sign up with Microsoft</DialogTitle>
                    <DialogContent>
                        {signUpError && <Alert severity="error" sx={{ mb: 2 }}>{signUpError}</Alert>}
                        <TextField
                            autoFocus
                            required
                            fullWidth
                            margin="dense"
                            id="sign-up-email"
                            label="Email address"
                            type="email"
                            autoComplete="email"
                            value={signUpEmail}
                            onChange={(event) => setSignUpEmail(event.target.value)}
                        />
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 2 }}>
                        <Button onClick={() => setSignUpOpen(false)} disabled={isSigningUp}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" disabled={isSigningUp}>
                            {isSigningUp ? 'Continuing…' : 'Continue with Microsoft'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
