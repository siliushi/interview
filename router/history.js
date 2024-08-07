class Router {
    constructor(routes) {
        this.routes = routes;
        this.loadInitialRoute();
        this.bindLinkClicks();
        window.addEventListener('popstate', () => this.loadRoute(location.pathname));
    }

    bindLinkClicks() {
        document.body.addEventListener('click', e => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigateTo(e.target.href);
            }
        });
    }

    navigateTo(url) {
        history.pushState(null, null, url);
        this.loadRoute(url);
    }

    loadRoute(path) {
        const matchedRoute = this.matchUrlToRoute(path);
        const routerOutElement = document.querySelector('#app');
        if (matchedRoute) {
            const urlParams = this.getUrlParams(matchedRoute, path);
            routerOutElement.innerHTML = matchedRoute.template(urlParams);
        } else {
            routerOutElement.innerHTML = '<h1>404 - Page Not Found</h1>';
        }
    }

    matchUrlToRoute(path) {
        const matchedRoute = this.routes.find(route => {
            const routePathSegments = route.path.split('/').slice(1);
            const urlPathSegments = path.split('/').slice(1);

            if (routePathSegments.length !== urlPathSegments.length) {
                return false;
            }

            return routePathSegments.every((routePathSegment, i) => {
                return routePathSegment.startsWith(':') || routePathSegment === urlPathSegments[i];
            });
        });

        return matchedRoute;
    }

    getUrlParams(route, path) {
        const routePathSegments = route.path.split('/').slice(1);
        const urlPathSegments = path.split('/').slice(1);

        return routePathSegments.reduce((params, segment, i) => {
            if (segment.startsWith(':')) {
                const paramName = segment.slice(1);
                params[paramName] = urlPathSegments[i];
            }
            return params;
        }, {});
    }

    loadInitialRoute() {
        this.loadRoute(location.pathname);
    }
}

// 定义路由和对应的模板
const routes = [
    { path: '/', template: () => '<h1>Home</h1><p>Welcome to the homepage!</p>' },
    { path: '/about', template: () => '<h1>About</h1><p>This is the about page.</p>' },
    { path: '/contact', template: () => '<h1>Contact</h1><p>This is the contact page.</p>' },
    { path: '/user/:id', template: (params) => `<h1>User</h1><p>User ID: ${params.id}</p>` }
];

// 初始化路由器
const router = new Router(routes);
