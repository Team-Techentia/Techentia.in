export const ROUTES = {
    HOME: "/",
    SERVICES: {
        ROOT: "/services",
        DETAIL: (id: string) => `/services/${id}`,
    },
    WORKS: {
        ROOT: "/works",
        DETAIL: (id: string) => `/works/${id}`
    },
    ABOUT: "/about",
    CONTACT: "/contact-us",
};