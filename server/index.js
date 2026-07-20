import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, useLocation } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { faro } from "@grafana/faro-react";
import { useImmer } from "use-immer";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { EventSourceParserStream } from "eventsource-parser/stream";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region app/entry.server.tsx
var entry_server_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), 6e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
//#endregion
//#region app/components/mainAppBar.tsx
var pages = [
	{
		page: "Chat",
		path: "/chat"
	},
	{
		page: "Home",
		path: "/"
	},
	{
		page: "Other",
		path: "/other"
	}
];
function MyAppBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	return /* @__PURE__ */ jsx(AppBar, {
		position: "static",
		children: /* @__PURE__ */ jsx(Container, {
			maxWidth: "xl",
			children: /* @__PURE__ */ jsxs(Toolbar, {
				disableGutters: true,
				children: [
					/* @__PURE__ */ jsx(IconButton, {
						size: "large",
						edge: "start",
						color: "inherit",
						"aria-label": "menu",
						sx: { mr: 2 },
						children: /* @__PURE__ */ jsx("img", {
							src: "/android-chrome-192x192.png",
							alt: "Logo",
							width: 32,
							height: 32
						})
					}),
					/* @__PURE__ */ jsx(Typography, {
						variant: "h6",
						noWrap: true,
						component: "a",
						href: "#app-bar-with-responsive-menu",
						sx: {
							mr: 2,
							display: {
								xs: "none",
								md: "flex"
							},
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none"
						},
						children: "MSK PORTFOLIO"
					}),
					/* @__PURE__ */ jsxs(Box, {
						sx: {
							flexGrow: 1,
							display: {
								xs: "flex",
								md: "none"
							}
						},
						children: [/* @__PURE__ */ jsx(IconButton, {
							size: "large",
							"aria-label": "account of current user",
							"aria-controls": "menu-appbar",
							"aria-haspopup": "true",
							onClick: handleOpenNavMenu,
							color: "inherit",
							children: /* @__PURE__ */ jsx(MenuIcon, {})
						}), /* @__PURE__ */ jsx(Menu, {
							id: "menu-appbar",
							anchorEl: anchorElNav,
							anchorOrigin: {
								vertical: "bottom",
								horizontal: "left"
							},
							keepMounted: true,
							transformOrigin: {
								vertical: "top",
								horizontal: "left"
							},
							open: Boolean(anchorElNav),
							onClose: handleCloseNavMenu,
							sx: { display: {
								xs: "block",
								md: "none"
							} },
							children: pages.map((page) => /* @__PURE__ */ jsx(Link, {
								to: page.path,
								children: /* @__PURE__ */ jsx(MenuItem, {
									onClick: handleCloseNavMenu,
									children: /* @__PURE__ */ jsx(Typography, {
										sx: { textAlign: "center" },
										children: page.page
									})
								}, page.page)
							}, page.page))
						})]
					}),
					/* @__PURE__ */ jsx(IconButton, { sx: {
						display: {
							xs: "flex",
							md: "none"
						},
						mr: 1
					} }),
					/* @__PURE__ */ jsx(Typography, {
						variant: "h5",
						noWrap: true,
						component: "a",
						href: "#app-bar-with-responsive-menu",
						sx: {
							mr: 2,
							display: {
								xs: "flex",
								md: "none"
							},
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none"
						},
						children: "MSK PORTFOLIO"
					}),
					/* @__PURE__ */ jsx(Box, {
						sx: {
							flexGrow: 1,
							display: {
								xs: "none",
								md: "flex"
							}
						},
						children: pages.map((page) => /* @__PURE__ */ jsx(Link, {
							to: page.path,
							children: /* @__PURE__ */ jsx(Button, {
								onClick: handleCloseNavMenu,
								sx: {
									my: 2,
									color: "white",
									display: "block"
								},
								children: page.page
							}, page.page)
						}, page.page))
					})
				]
			})
		})
	});
}
//#endregion
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	Layout: () => Layout,
	default: () => root_default
});
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx("link", {
				rel: "icon",
				type: "image/x-icon",
				href: "/favicon.ico"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: "TMartin Sven Kovačić AI powered portfolio. To demonstrate my skill and provide answers based on my real knowledge and experiences."
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:title",
				content: "Martin Sven Kovačić AI powered portfolio"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:description",
				content: "Martin Sven Kovačić AI powered portfolio. To demonstrate my skill and provide answers based on my real knowledge and experiences."
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:url",
				content: "https://mskovacic.github.io"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:site_name",
				content: "MSKovacic"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:type",
				content: "website"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image",
				content: "https://mskovacic.github.io/public/profile.webp"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:image",
				content: "https://mskovacic.github.io/public/profile.webp"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:url",
				content: "https://mskovacic.github.io"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:card",
				content: "summary_large_image"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:title",
				content: "Martin Sven Kovačić AI powered portfolio"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:description",
				content: "Martin Sven Kovačić AI powered portfolio. To demonstrate my skill and provide answers based on my real knowledge and experiences."
			}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			/* @__PURE__ */ jsx(MyAppBar, {}),
			children,
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
var root_default = UNSAFE_withComponentProps(function App() {
	const location = useLocation();
	const previousPath = useRef(location.pathname);
	useEffect(() => {
		faro.api.pushEvent("route_change", {
			from: previousPath.current,
			to: location.pathname
		});
		faro.api.setView({ name: location.pathname });
		previousPath.current = location.pathname;
	}, [location]);
	return /* @__PURE__ */ jsx(Outlet, {});
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack;
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "pt-16 p-4 container mx-auto",
		children: [
			/* @__PURE__ */ jsx("h1", { children: message }),
			/* @__PURE__ */ jsx("p", { children: details }),
			stack
		]
	});
});
//#endregion
//#region app/routes/home.tsx
var home_exports = /* @__PURE__ */ __exportAll({
	default: () => home_default,
	loader: () => loader
});
function loader({ params }) {
	return { name: "React Router" };
}
var home_default = UNSAFE_withComponentProps(function Home({ loaderData }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "text-center p-4",
		children: [/* @__PURE__ */ jsxs("h1", {
			className: "text-2xl",
			children: ["Hello, ", loaderData.name]
		}), /* @__PURE__ */ jsx("a", {
			className: "block mt-2 text-blue-500 underline hover:text-blue-600",
			href: "https://reactrouter.com/docs",
			children: "React Router Docs"
		})]
	});
});
//#endregion
//#region app/helpers/api.ts
async function createChat() {
	const res = await fetch("undefined/threads?api-version=2025-03-01-preview", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: "{}"
	});
	const data = await res.json();
	if (!res.ok) return Promise.reject({
		status: res.status,
		data
	});
	return data;
}
async function sendChatMessage(messages) {
	console.log({
		url: void 0,
		env: {
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"SSR": true
		}
	});
	const inputMessages = messages.toSpliced(0, messages.length - 20).map((msg) => ({
		type: "message",
		role: msg.role,
		content: msg.content
	}));
	const res = await fetch("undefined/responses?subscription-key=7e54d6f30b864cf598d34d39e931932b", {
		method: "POST",
		headers: { "Content-Type": "text/plain" },
		body: JSON.stringify(inputMessages)
	});
	if (!res.ok) {
		if (res.status === 429) {
			const time = res.headers.get("Retry-After");
			toast.error(`Request limit reached! Please try-again in ${time} seconds!`, {
				position: "top-right",
				autoClose: 5e3,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: void 0,
				theme: "light"
			});
		}
		return Promise.reject({
			status: res.status,
			data: await res.json()
		});
	}
	return res.body;
}
async function getChatMessages(chatId) {
	const res = await fetch(`undefined/threads/${chatId}/messages?api-version=2025-03-01-preview&limit=20&order=desc`);
	if (!res.ok) return Promise.reject({
		status: res.status,
		data: await res.json()
	});
	return res.body;
}
var api_default = {
	createChat,
	sendChatMessage,
	getChatMessages
};
//#endregion
//#region app/helpers/utils.ts
async function* parseSSEStream(stream) {
	const sseReader = stream.pipeThrough(new TextDecoderStream()).pipeThrough(new EventSourceParserStream()).getReader();
	while (true) {
		const { done, value } = await sseReader.read();
		if (done) break;
		yield value.data;
	}
}
//#endregion
//#region app/hooks/useAutoScroll.ts
var SCROLL_THRESHOLD = 10;
function useAutoScroll(active) {
	const scrollContentRef = useRef(null);
	const isDisabled = useRef(false);
	const prevScrollTop = useRef(null);
	useEffect(() => {
		const resizeObserver = new ResizeObserver(() => {
			const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
			if (!isDisabled.current && scrollHeight - clientHeight > scrollTop) document.documentElement.scrollTo({
				top: scrollHeight - clientHeight,
				behavior: "smooth"
			});
		});
		if (scrollContentRef.current) resizeObserver.observe(scrollContentRef.current);
		return () => resizeObserver.disconnect();
	}, []);
	useLayoutEffect(() => {
		if (!active) {
			isDisabled.current = true;
			return;
		}
		function onScroll() {
			const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
			if (!isDisabled.current && window.scrollY < prevScrollTop.current && scrollHeight - clientHeight > scrollTop + SCROLL_THRESHOLD) isDisabled.current = true;
			else if (isDisabled.current && scrollHeight - clientHeight <= scrollTop + SCROLL_THRESHOLD) isDisabled.current = false;
			prevScrollTop.current = window.scrollY;
		}
		isDisabled.current = false;
		prevScrollTop.current = document.documentElement.scrollTop;
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, [active]);
	return scrollContentRef;
}
//#endregion
//#region app/components/spinner.tsx
function Spinner() {
	return /* @__PURE__ */ jsxs("div", {
		className: "relative h-12 w-12",
		children: [/* @__PURE__ */ jsx("span", { className: "spinner-child animate-spinner" }), /* @__PURE__ */ jsx("span", { className: "spinner-child animate-spinner-delayed" })]
	});
}
//#endregion
//#region app/assets/images/error.svg
var error_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='rgb(208,%2069,%2082)'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%20class='lucide%20lucide-circle-x'%3e%3ccircle%20cx='12'%20cy='12'%20r='10'/%3e%3cpath%20d='m15%209-6%206'/%3e%3cpath%20d='m9%209%206%206'/%3e%3c/svg%3e";
//#endregion
//#region app/assets/images/delete_24.svg
var delete_24_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='24px'%20viewBox='0%20-960%20960%20960'%20width='24px'%20fill='%231f1f1f'%3e%3cpath%20d='M280-120q-33%200-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0%2033-23.5%2056.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160%200h80v-360h-80v360ZM280-720v520-520Z'/%3e%3c/svg%3e";
//#endregion
//#region app/components/chat/chatMessages.tsx
function MarkdownContainer(loading, content, role) {
	if (loading && !content) return /* @__PURE__ */ jsx(Spinner, {});
	else if (role === "assistant") return /* @__PURE__ */ jsx(Markdown, {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [rehypeRaw],
		remarkRehypeOptions: { passThrough: ["link"] },
		children: content
	});
	else return /* @__PURE__ */ jsx("div", {
		className: "whitespace-pre-line",
		children: content
	});
}
function ChatMessages({ messages, isLoading, deleteMessage }) {
	return /* @__PURE__ */ jsx("div", {
		ref: useAutoScroll(isLoading),
		className: "grow space-y-4",
		children: messages.map(({ role, content, loading, error }, idx) => /* @__PURE__ */ jsxs("div", {
			className: `message flex items-start gap-4 py-4 px-3 rounded-xl ${role === "user" ? "bg-primary-blue/10" : ""}`,
			children: [role === "user" && /* @__PURE__ */ jsx("img", {
				className: "h-[26px] w-[26px] shrink-0",
				src: "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='rgb(146,%20179,%20202)'%20stroke-width='1.5'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='12'%20cy='9'%20r='3'/%3e%3ccircle%20cx='12'%20cy='12'%20r='10'/%3e%3cpath%20d='M17.9691%2020C17.81%2017.1085%2016.9247%2015%2011.9999%2015C7.07521%2015%206.18991%2017.1085%206.03076%2020'%20stroke-linecap='round'/%3e%3c/svg%3e",
				alt: "user"
			}), /* @__PURE__ */ jsxs("div", {
				style: {
					display: "flex",
					alignItems: "around",
					width: "100%"
				},
				children: [/* @__PURE__ */ jsx("div", {
					style: {
						overflow: "auto",
						maxWidth: "95%"
					},
					children: error ? /* @__PURE__ */ jsxs("div", {
						className: `flex items-center gap-1 text-sm text-error-red ${content && "mt-2"}`,
						children: [/* @__PURE__ */ jsx("img", {
							className: "h-5 w-5",
							src: error_default,
							alt: "error"
						}), /* @__PURE__ */ jsx("span", { children: "Error generating the response" })]
					}) : /* @__PURE__ */ jsx("div", {
						className: "markdown-container",
						children: MarkdownContainer(loading, content, role)
					})
				}), /* @__PURE__ */ jsx("div", {
					style: {
						marginLeft: "auto",
						visibility: "hidden"
					},
					children: /* @__PURE__ */ jsx("img", {
						className: "h-5 w-5 clickable",
						src: delete_24_default,
						alt: "delete",
						onClick: () => {
							deleteMessage(idx);
						}
					})
				})]
			})]
		}, idx))
	});
}
//#endregion
//#region app/hooks/useAutosize.ts
function useAutosize(value) {
	const ref = useRef(null);
	const [borderWidth, setBorderWidth] = useState(0);
	useLayoutEffect(() => {
		const style = window.getComputedStyle(ref.current);
		setBorderWidth(parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth));
	}, []);
	useLayoutEffect(() => {
		ref.current.style.height = "inherit";
		ref.current.style.height = `${ref.current.scrollHeight + borderWidth}px`;
	}, [value, borderWidth]);
	return ref;
}
//#endregion
//#region app/assets/images/send.svg
var send_default = "data:image/svg+xml,%3csvg%20width='22'%20height='22'%20viewBox='0%200%2022%2022'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.735%2021.5701L21.2132%200.363962L0.00707106%208.84217L4.94975%2013.799L16.9706%204.6066L7.77817%2016.6274L12.735%2021.5701Z'%20fill='rgb(146,%20179,%20202)'/%3e%3c/svg%3e";
//#endregion
//#region app/components/chat/chatInput.tsx
function ChatInput({ newMessage, isLoading, submitNewMessage }) {
	const [prompt, setPrompt] = useState(newMessage);
	const textareaRef = useAutosize(newMessage);
	function handleKeyDown(e) {
		if (e.key === "Enter" && !e.shiftKey && !isLoading) {
			e.preventDefault();
			mySubmit();
		}
	}
	function mySubmit() {
		submitNewMessage(prompt);
		setPrompt("");
	}
	return /* @__PURE__ */ jsx("div", {
		className: "sticky bottom-0 shrink-0 bg-white py-4",
		children: /* @__PURE__ */ jsx("div", {
			className: "p-1.5 bg-primary-blue/35 rounded-3xl z-50 font-mono origin-bottom animate-chat duration-400",
			children: /* @__PURE__ */ jsxs("div", {
				className: "pr-0.5 bg-white relative shrink-0 rounded-3xl overflow-hidden ring-primary-blue ring-1 focus-within:ring-2 transition-all",
				children: [/* @__PURE__ */ jsx("textarea", {
					className: "block w-full max-h-[140px] py-2 px-4 pr-11 bg-white rounded-3xl resize-none placeholder:text-primary-blue placeholder:leading-4 placeholder:-translate-y-1 sm:placeholder:leading-normal sm:placeholder:translate-y-0 focus:outline-hidden",
					ref: textareaRef,
					rows: 1,
					value: prompt,
					onChange: (e) => setPrompt(e.target.value),
					onKeyDown: handleKeyDown,
					disabled: isLoading
				}), /* @__PURE__ */ jsx("button", {
					className: "absolute top-1/2 -translate-y-1/2 right-3 p-1 rounded-md hover:bg-primary-blue/20",
					onClick: () => mySubmit(),
					disabled: isLoading,
					children: /* @__PURE__ */ jsx("img", {
						src: send_default,
						alt: "send"
					})
				})]
			})
		})
	});
}
//#endregion
//#region app/components/chat/chatbot.tsx
function getMessages() {
	if (typeof window === "undefined") return [];
	return JSON.parse(globalThis.localStorage.getItem("messages") ?? "[]") || [];
}
function Chatbot() {
	const [messages, setMessages] = useImmer(getMessages());
	useEffect(() => {
		globalThis.localStorage.setItem("messages", JSON.stringify(messages));
	}, [messages]);
	const isLoading = messages.length && messages[messages.length - 1].loading;
	async function submitNewMessage(newMessage) {
		const trimmedMessage = newMessage.trim();
		if (!trimmedMessage || isLoading) return;
		setMessages((draft) => [
			...draft,
			{
				role: "user",
				content: trimmedMessage
			},
			{
				role: "assistant",
				content: "",
				sources: [],
				loading: true
			}
		]);
		try {
			const stream = await api_default.sendChatMessage([...messages, {
				role: "user",
				content: trimmedMessage
			}]);
			for await (const textChunk of parseSSEStream(stream)) {
				const responseObject = JSON.parse(textChunk);
				if (responseObject.type == "response.output_text.delta") setMessages((draft) => {
					draft.at(-1).content += responseObject.delta;
				});
			}
			setMessages((draft) => {
				draft.at(-1).loading = false;
			});
		} catch (err) {
			console.log(err);
			setMessages((draft) => {
				draft.at(-1).loading = false;
				draft.at(-1).error = true;
			});
		}
	}
	function deleteMessage(index) {
		setMessages((draft) => {
			draft.splice(index, 1);
		});
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "relative grow flex flex-col gap-6 pt-6",
		children: [
			messages.length === 0 && /* @__PURE__ */ jsxs("div", {
				className: "mt-3 font-urbanist text-primary-blue text-xl font-light space-y-2",
				children: [
					/* @__PURE__ */ jsx("p", { children: "👋 Welcome!" }),
					/* @__PURE__ */ jsx("p", { children: "I am a chatbot powered by experiences." }),
					/* @__PURE__ */ jsx("p", { children: "Ask me anything about Martin Sven Kovačić" }),
					/* @__PURE__ */ jsx("br", {}),
					/* @__PURE__ */ jsxs("div", {
						style: {
							display: "grid",
							gap: "5px"
						},
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "p-3 question-box",
								style: {
									border: "2px solid lightgrey",
									borderRadius: "10px",
									gridColumn: "1/2",
									gridRow: "1/2"
								},
								onClick: () => submitNewMessage("What projects did Martin work on? List his responsibilities and technologies used."),
								children: "📈 What projects did Martin work on? List his responsibilities and technologies used."
							}),
							/* @__PURE__ */ jsx("div", {
								className: "p-3 question-box",
								style: {
									border: "2px solid lightgrey",
									borderRadius: "10px",
									gridColumn: "3/4",
									gridRow: "1/2"
								},
								onClick: () => submitNewMessage("What is Martin's the most significant achievement?"),
								children: "🏁 What is Martin's the most significant achievement?"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "p-3 question-box",
								style: {
									border: "2px solid lightgrey",
									borderRadius: "10px",
									gridColumn: "3/4",
									gridRow: "3/4"
								},
								onClick: () => submitNewMessage("List his strengths and weakneses. Also mention how they affected each project."),
								children: "📊 List his strengths and weakneses. Also mention how they affected each project."
							}),
							/* @__PURE__ */ jsx("div", {
								className: "p-3 question-box",
								style: {
									border: "2px solid lightgrey",
									borderRadius: "10px",
									gridColumn: "1/2",
									gridRow: "3/4"
								},
								onClick: () => submitNewMessage("What are Martin's hobbies and interests outside of work?"),
								children: "🎯 What are Martin's hobbies and interests outside of work?"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsx(ChatMessages, {
				messages,
				isLoading,
				deleteMessage
			}),
			/* @__PURE__ */ jsx(ChatInput, {
				newMessage: "",
				isLoading,
				submitNewMessage
			})
		]
	});
}
//#endregion
//#region app/routes/chat.tsx
var chat_exports = /* @__PURE__ */ __exportAll({
	default: () => chat_default,
	meta: () => meta
});
function meta({}) {
	return [{ title: "New React Router App" }, {
		name: "description",
		content: "Welcome to React Router!"
	}];
}
var chat_default = UNSAFE_withComponentProps(function Chat() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col min-h-full w-full max-w-3xl mx-auto px-4",
		children: [
			/* @__PURE__ */ jsx(ToastContainer, {
				position: "top-right",
				autoClose: 5e3,
				hideProgressBar: false,
				newestOnTop: false,
				closeOnClick: true,
				rtl: false,
				pauseOnFocusLoss: true,
				draggable: true,
				pauseOnHover: true,
				theme: "light",
				transition: Bounce
			}),
			/* @__PURE__ */ jsx(ToastContainer, {}),
			/* @__PURE__ */ jsx("header", {
				className: "sticky top-0 shrink-0 z-20 bg-white",
				children: /* @__PURE__ */ jsx("div", {
					className: "flex flex-col h-full w-full gap-1 pt-4 pb-2",
					children: /* @__PURE__ */ jsx("h1", {
						className: "font-urbanist text-[1.65rem] font-semibold",
						children: "AI powered portfolio"
					})
				})
			}),
			/* @__PURE__ */ jsx(Chatbot, {})
		]
	});
});
//#endregion
//#region app/routes/other.tsx
var other_exports = /* @__PURE__ */ __exportAll({ default: () => other_default });
var other_default = UNSAFE_withComponentProps(function Other({ loaderData }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", { children: "Other Page" }), /* @__PURE__ */ jsx("p", { children: "Content is coming soon." })] });
});
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-C5dUXYrF.js",
		"imports": ["/assets/jsx-runtime-Fn1WGpml.js", "/assets/esm-qjTVlE98.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/root-BZWycGwm.js",
			"imports": [
				"/assets/jsx-runtime-Fn1WGpml.js",
				"/assets/esm-qjTVlE98.js",
				"/assets/clsx-CjueKrWZ.js"
			],
			"css": ["/assets/root-CePf1PYe.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/home": {
			"id": "routes/home",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/home-DaMKtK7E.js",
			"imports": ["/assets/jsx-runtime-Fn1WGpml.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/chat": {
			"id": "routes/chat",
			"parentId": "root",
			"path": "chat",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/chat-CFwszANV.js",
			"imports": ["/assets/jsx-runtime-Fn1WGpml.js", "/assets/clsx-CjueKrWZ.js"],
			"css": ["/assets/chat-D4aCc3Up.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/other": {
			"id": "routes/other",
			"parentId": "root",
			"path": "other",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/other-B7bF1eia.js",
			"imports": ["/assets/jsx-runtime-Fn1WGpml.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-6e34fd21.js",
	"version": "6e34fd21",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var assetsBuildDirectory = "build/client";
var basename = "/";
var future = {
	"unstable_optimizeDeps": false,
	"v8_passThroughRequests": true,
	"v8_trailingSlashAwareDataRequests": true,
	"unstable_previewServerPrerendering": false,
	"v8_middleware": true,
	"v8_splitRouteModules": true,
	"v8_viteEnvironmentApi": true
};
var ssr = true;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/";
var entry = { module: entry_server_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/home": {
		id: "routes/home",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: home_exports
	},
	"routes/chat": {
		id: "routes/chat",
		parentId: "root",
		path: "chat",
		index: void 0,
		caseSensitive: void 0,
		module: chat_exports
	},
	"routes/other": {
		id: "routes/other",
		parentId: "root",
		path: "other",
		index: void 0,
		caseSensitive: void 0,
		module: other_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
