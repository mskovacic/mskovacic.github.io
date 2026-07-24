import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
    index("routes/chat.tsx"),
    route("welcome", "routes/home.tsx"),
    route("other", "routes/other.tsx"), 

] satisfies RouteConfig;