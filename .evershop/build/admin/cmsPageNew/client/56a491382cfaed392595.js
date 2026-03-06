/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 98272
(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(96540);
// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(40961);
// EXTERNAL MODULE: ./node_modules/immer/dist/immer.mjs
var immer = __webpack_require__(1932);
;// ./node_modules/@evershop/evershop/dist/components/common/context/app.js
/* unused harmony import specifier */ var React;


const AppStateContext = react.createContext({});
const AppContextDispatch = react.createContext({});
function AppProvider({ value, children }) {
    const [data, setData] = react.useState(value);
    const [fetching, setFetching] = react.useState(false);
    const fetchPageData = async (url) => {
        setFetching(true);
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const dataResponse = await response.json();
            // Update the entire context using immer
            setData((0,immer/* produce */.jM)(data, (draft) => {
                Object.assign(draft, dataResponse.eContext);
                return draft;
            }));
        }
        catch (error) {
        }
        finally {
            setFetching(false);
        }
    };
    react.useEffect(() => {
        window.onpopstate = async () => {
            // Get the current url
            const url = new URL(window.location.href, window.location.origin);
            url.searchParams.append('ajax', 'true');
            await fetchPageData(url.toString());
        };
    }, []);
    const contextDispatchValue = (0,react.useMemo)(() => ({ setData, fetchPageData }), [setData, fetchPageData]);
    const contextValue = (0,react.useMemo)(() => ({ ...data, fetching }), [data, fetching]);
    return (react.createElement(AppContextDispatch.Provider, { value: contextDispatchValue },
        react.createElement(AppStateContext.Provider, { value: contextValue }, children)));
}
const useAppState = () => react.useContext(AppStateContext);
const useAppDispatch = () => React.useContext(AppContextDispatch);
//# sourceMappingURL=app.js.map
;// ./node_modules/@evershop/evershop/dist/lib/util/keyGenerator.js
// Simple hash function that works identically in both browser and Node.js
function simpleHash(str) {
    let hash = 0;
    if (str.length === 0)
        return hash.toString(16);
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    // Convert to positive hex string with consistent length
    return Math.abs(hash).toString(16).padStart(8, '0');
}
function generateComponentKey(text) {
    // Remove everything before '/src/' or '/dist/'
    const subPath = text.split('/src/')[1] || text.split('/dist/')[1];
    if (!subPath) {
        return `e${simpleHash(text)}`;
    }
    return `e${simpleHash(subPath)}`;
}
//# sourceMappingURL=keyGenerator.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/Area.js



function Area(props) {
    const context = useAppState();
    const { id, coreComponents, wrapperProps, noOuter, wrapper, className, components } = props;
    const areaComponents = (() => {
        const areaCoreComponents = coreComponents || [];
        const widgets = context.widgets || [];
        const wildCardWidgets = (components === null || components === void 0 ? void 0 : components['*']) || {};
        const assignedWidgets = [];
        widgets.forEach((widget) => {
            const adminKey = generateComponentKey(`admin_widget_${widget.type}`);
            const frontKey = generateComponentKey(`widget_${widget.type}`);
            const w = wildCardWidgets[adminKey] || wildCardWidgets[frontKey];
            if (widget.areaId.includes(id) && w !== undefined) {
                assignedWidgets.push({
                    id: widget.id,
                    sortOrder: widget.sortOrder,
                    props: widget.props,
                    component: w.component
                });
            }
        });
        const cs = (components === null || components === void 0 ? void 0 : components[id]) === undefined
            ? areaCoreComponents.concat(assignedWidgets)
            : areaCoreComponents
                .concat(Object.values(components[id]))
                .concat(assignedWidgets);
        return cs.sort((obj1, obj2) => (obj1.sortOrder || 0) - (obj2.sortOrder || 0));
    })();
    const { propsMap } = context;
    let WrapperComponent = react.Fragment;
    if (noOuter !== true) {
        if (wrapper !== undefined) {
            WrapperComponent = wrapper;
        }
        else {
            WrapperComponent = 'div';
        }
    }
    let areaWrapperProps = {};
    if (noOuter === true) {
        areaWrapperProps = {};
    }
    else if (typeof wrapperProps === 'object' && wrapperProps !== null) {
        areaWrapperProps = { className: className || '', ...wrapperProps };
    }
    else {
        areaWrapperProps = { className: className || '' };
    }
    return (react.createElement(WrapperComponent, { ...areaWrapperProps }, areaComponents.map((w, index) => {
        const C = w.component.default;
        const { id } = w;
        const propsData = context.graphqlResponse;
        const propKeys = id !== undefined ? propsMap[id] || [] : [];
        const componentProps = propKeys.reduce((acc, map) => {
            const { origin, alias } = map;
            acc[origin] = propsData[alias];
            return acc;
        }, {});
        if (w.props) {
            Object.assign(componentProps, w.props);
        }
        // Check if C is a React component
        if (react.isValidElement(C)) {
            return react.createElement(react.Fragment, { key: index }, C);
        }
        if (typeof C === 'string') {
            return react.createElement(C, { key: index, ...componentProps });
        }
        return typeof C === 'function' ? (react.createElement(C, { key: index, areaProps: props, ...componentProps })) : null;
    })));
}
Area.defaultProps = {
    className: undefined,
    coreComponents: [],
    noOuter: false,
    wrapper: 'div',
    wrapperProps: {}
};

/* harmony default export */ const common_Area = (Area);
//# sourceMappingURL=Area.js.map
// EXTERNAL MODULE: ./node_modules/@urql/core/dist/urql-core.mjs
var urql_core = __webpack_require__(8714);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/button/Button.js
var Button = __webpack_require__(50239);
// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.mjs
var clsx = __webpack_require__(34164);
// EXTERNAL MODULE: ./node_modules/tailwind-merge/dist/bundle-mjs.mjs
var bundle_mjs = __webpack_require__(50856);
;// ./node_modules/@evershop/evershop/dist/lib/util/cn.js


function cn(...inputs) {
    return (0,bundle_mjs/* twMerge */.QP)((0,clsx/* clsx */.$)(inputs));
}
//# sourceMappingURL=cn.js.map
// EXTERNAL MODULE: ./node_modules/class-variance-authority/dist/index.mjs
var dist = __webpack_require__(22732);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/loader-circle.js
var loader_circle = __webpack_require__(8723);
;// ./node_modules/@evershop/evershop/dist/components/common/ui/Spinner.js



function Spinner({ className, ...props }) {
    return (react.createElement(loader_circle/* default */.A, { role: "status", "aria-label": "Loading", className: cn('size-4 animate-spin', className), ...props }));
}

//# sourceMappingURL=Spinner.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/ui/Button.js





const buttonVariants = (0,dist/* cva */.F)("focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/80',
            outline: 'border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground shadow-xs',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
            ghost: 'hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground',
            destructive: 'bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
            xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
            sm: 'h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
            lg: 'h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
            xl: "h-12 gap-2 px-4 text-base has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5 [&_svg:not([class*='size-'])]:size-5",
            icon: 'size-9',
            'icon-xs': "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
            'icon-sm': 'size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md',
            'icon-lg': 'size-10',
            'icon-xl': 'size-12'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Button_Button({ className, variant = 'default', size = 'default', isLoading = false, disabled, children, ...props }) {
    return (react.createElement(Button/* Button */.$, { "data-slot": "button", className: cn(buttonVariants({ variant, size, className })), disabled: disabled || isLoading, ...props }, isLoading ? react.createElement(Spinner, null) : children));
}

//# sourceMappingURL=Button.js.map
;// ./node_modules/@evershop/evershop/dist/lib/util/assign.js
/**
 * This function take 2 objects and merge the second one to the first one
 *
 * @param   {object}  object  The main object
 * @param   {object}  data    The object to be merged
 *
 */
function assign_assign(object, data) {
    if (typeof object !== 'object' || object === null) {
        throw new Error('`object` must be an object');
    }
    if (typeof data !== 'object' || data === null) {
        throw new Error('`data` must be an object');
    }
    Object.keys(data).forEach((key) => {
        if (data[key] &&
            data[key].constructor === Array &&
            object[key] &&
            object[key].constructor === Array) {
            object[key] = object[key].concat(data[key]);
        }
        else if (typeof object[key] !== 'object' ||
            typeof data[key] !== 'object' ||
            object[key] === null) {
            object[key] = data[key];
        }
        else {
            assign_assign(object[key], data[key]);
        }
    });
}
//# sourceMappingURL=assign.js.map
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(5556);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
;// ./node_modules/@evershop/evershop/dist/components/common/ui/Card.js
/* unused harmony import specifier */ var Card_cn;
/* unused harmony import specifier */ var Card_React;


function Card({ className, size = 'default', ...props }) {
    return (react.createElement("div", { "data-slot": "card", "data-size": size, className: cn('ring-foreground/10 bg-card text-card-foreground gap-6 rounded-xl py-6 text-sm shadow-xs ring-1 has-[>img:first-child]:pt-0 data-[size=sm]:gap-4 data-[size=sm]:py-4 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col', className), ...props }));
}
function CardHeader({ className, ...props }) {
    return (react.createElement("div", { "data-slot": "card-header", className: cn('gap-1 rounded-t-xl px-6 group-data-[size=sm]/card:px-4 [.border-b]:pb-6 group-data-[size=sm]/card:[.border-b]:pb-4 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]', className), ...props }));
}
function CardTitle({ className, ...props }) {
    return (react.createElement("div", { "data-slot": "card-title", className: cn('text-base leading-normal font-medium group-data-[size=sm]/card:text-sm', className), ...props }));
}
function CardDescription({ className, ...props }) {
    return (react.createElement("div", { "data-slot": "card-description", className: cn('text-muted-foreground text-sm', className), ...props }));
}
function CardAction({ className, ...props }) {
    return (Card_React.createElement("div", { "data-slot": "card-action", className: Card_cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className), ...props }));
}
function CardContent({ className, ...props }) {
    return (react.createElement("div", { "data-slot": "card-content", className: cn('px-6 group-data-[size=sm]/card:px-4', className), ...props }));
}
function CardFooter({ className, ...props }) {
    return (react.createElement("div", { "data-slot": "card-footer", className: cn('rounded-b-xl px-6 group-data-[size=sm]/card:px-4 [.border-t]:pt-6 group-data-[size=sm]/card:[.border-t]:pt-4 flex items-center', className), ...props }));
}

//# sourceMappingURL=Card.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/modal/Alert.js
/* unused harmony import specifier */ var Alert_React;









const AlertContext = react.createContext();
const useAlertContext = () => Alert_React.useContext(AlertContext);
function reducer(state, action) {
    switch (action.type) {
        case 'close':
            return { ...state, showing: false, closing: false };
        case 'closing':
            return { ...state, showing: true, closing: true };
        case 'open':
            return { ...state, showing: true, closing: false };
        default:
            throw new Error();
    }
}
const alertReducer = (0,immer/* produce */.jM)((draff, action) => {
    switch (action.type) {
        case 'open':
            draff = { ...action.payload };
            return draff;
        case 'remove':
            return {};
        case 'update':
            assign_assign(draff, action.payload);
            return draff;
        default:
            throw new Error();
    }
});
function Alert({ children }) {
    const [alert, dispatchAlert] = (0,react.useReducer)(alertReducer, {});
    const [state, dispatch] = (0,react.useReducer)(reducer, {
        showing: false,
        closing: false
    });
    const openAlert = ({ heading, content, primaryAction, secondaryAction }) => {
        dispatchAlert({
            type: 'open',
            payload: {
                heading,
                content,
                primaryAction,
                secondaryAction
            }
        });
        dispatch({ type: 'open' });
    };
    return (react.createElement(AlertContext.Provider, { value: {
            dispatchAlert,
            openAlert,
            closeAlert: () => dispatch({ type: 'closing' })
        } },
        children,
        state.showing === true &&
            react_dom.createPortal(react.createElement("div", { className: state.closing === false
                    ? 'modal-overlay fadeIn'
                    : 'modal-overlay fadeOut', onAnimationEnd: () => {
                    if (state.closing) {
                        dispatch({ type: 'close' });
                        dispatchAlert({ type: 'remove' });
                    }
                } },
                react.createElement("div", { key: state.key, className: "modal-wrapper flex self-center justify-center", "aria-modal": true, "aria-hidden": true, tabIndex: -1, role: "dialog" },
                    react.createElement("div", { className: "modal" },
                        react.createElement(Card, null,
                            alert.heading && (react.createElement(CardHeader, null,
                                react.createElement(CardTitle, null, alert.heading))),
                            react.createElement(CardContent, null, alert.content),
                            (alert.primaryAction !== undefined ||
                                alert.secondaryAction !== undefined) && (react.createElement(CardFooter, null,
                                react.createElement("div", { className: "flex justify-end space-x-2 w-full" },
                                    alert.primaryAction && (react.createElement(Button_Button, { onClick: alert.primaryAction.onAction, variant: alert.primaryAction.variant }, alert.primaryAction.title)),
                                    alert.secondaryAction && (react.createElement(Button_Button, { onClick: alert.secondaryAction.onAction, variant: alert.secondaryAction.variant }, alert.secondaryAction.title))))))))), document.body)));
}
Alert.propTypes = {
    children: prop_types.node.isRequired
};

//# sourceMappingURL=Alert.js.map
// EXTERNAL MODULE: ./node_modules/urql/dist/urql.es.js
var urql_es = __webpack_require__(57496);
;// ./node_modules/@evershop/evershop/dist/components/common/react/client/Hydrate.js





function Hydrate({ client }) {
    return (react.createElement(urql_es/* Provider */.Kq, { value: client },
        react.createElement(AppProvider, { value: window.eContext },
            react.createElement(Alert, null,
                react.createElement(common_Area, { id: "body", className: "wrapper" })))));
}
//# sourceMappingURL=Hydrate.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/react/client/HydrateAdmin.js



const client = (0,urql_core/* createClient */.UU)({
    url: '/api/admin/graphql'
});
function HydrateAdmin() {
    return react.createElement(Hydrate, { client: client });
}
//# sourceMappingURL=HydrateAdmin.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/react/client/HydrateFrontStore.js
/* unused harmony import specifier */ var HydrateFrontStore_React;
/* unused harmony import specifier */ var HydrateFrontStore_Hydrate;



const HydrateFrontStore_client = (0,urql_core/* createClient */.UU)({
    url: '/api/graphql'
});
function HydrateFrontStore() {
    return HydrateFrontStore_React.createElement(HydrateFrontStore_Hydrate, { client: HydrateFrontStore_client });
}
//# sourceMappingURL=HydrateFrontStore.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/react/server/Server.js
/* unused harmony import specifier */ var Server_Area;
/* unused harmony import specifier */ var Server_Alert;
/* unused harmony import specifier */ var Server_React;



function ServerHtml({ route, css, js, appContext }) {
    const classes = route.isAdmin
        ? `admin ${route.id}`
        : `frontStore ${route.id}`;
    return (Server_React.createElement(Server_React.Fragment, null,
        Server_React.createElement("head", null,
            Server_React.createElement("meta", { charSet: "utf-8" }),
            Server_React.createElement("script", { dangerouslySetInnerHTML: { __html: appContext } }),
            css.map((source, index) => (Server_React.createElement("style", { key: index, dangerouslySetInnerHTML: { __html: source } }))),
            Server_React.createElement(Server_Area, { noOuter: true, id: "head" })),
        Server_React.createElement("body", { id: "body", className: classes },
            Server_React.createElement("div", { id: "app" },
                Server_React.createElement(Server_Alert, null,
                    Server_React.createElement(Server_Area, { id: "body", className: "wrapper" }))),
            js.map((src, index) => (Server_React.createElement("script", { src: src, key: index }))))));
}
/* harmony default export */ const Server = ((/* unused pure expression or super */ null && (ServerHtml)));
//# sourceMappingURL=Server.js.map
// EXTERNAL MODULE: ./node_modules/react-dom/server.browser.js
var server_browser = __webpack_require__(65848);
;// ./node_modules/@evershop/evershop/dist/components/common/react/server/render.js
/* unused harmony import specifier */ var render_AppProvider;
/* unused harmony import specifier */ var render_ServerHtml;
/* unused harmony import specifier */ var render_React;
/* unused harmony import specifier */ var renderToString;




function renderHtml(route, js, css, contextData, langeCode) {
    const source = renderToString(render_React.createElement(render_AppProvider, { value: JSON.parse(contextData) },
        render_React.createElement(render_ServerHtml, { route: route, js: js, css: css, appContext: `var eContext = ${contextData}` })));
    return `<!DOCTYPE html><html id="root" lang="${langeCode}">${source}</html>`;
}

//# sourceMappingURL=render.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/index.js
/* unused harmony import specifier */ var components_common_Area;








/* harmony default export */ const common = ((/* unused pure expression or super */ null && (components_common_Area)));
//# sourceMappingURL=index.js.map
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/menu/root/MenuRoot.js + 2 modules
var MenuRoot = __webpack_require__(6466);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/menu/trigger/MenuTrigger.js + 6 modules
var MenuTrigger = __webpack_require__(60065);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/menu/portal/MenuPortal.js
var MenuPortal = __webpack_require__(97526);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/menu/positioner/MenuPositioner.js
var MenuPositioner = __webpack_require__(57902);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/menu/popup/MenuPopup.js + 1 modules
var MenuPopup = __webpack_require__(86149);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/menu/item/MenuItem.js + 2 modules
var MenuItem = __webpack_require__(40343);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/separator/Separator.js
var Separator = __webpack_require__(44657);
;// ./node_modules/@evershop/evershop/dist/components/common/ui/DropdownMenu.js
/* unused harmony import specifier */ var MenuPrimitive;
/* unused harmony import specifier */ var DropdownMenu_cn;
/* unused harmony import specifier */ var CheckIcon;
/* unused harmony import specifier */ var ChevronRightIcon;
/* unused harmony import specifier */ var DropdownMenu_React;




function DropdownMenu({ ...props }) {
    return react.createElement(MenuRoot/* MenuRoot */.i, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuPortal({ ...props }) {
    return DropdownMenu_React.createElement(MenuPrimitive.Portal, { "data-slot": "dropdown-menu-portal", ...props });
}
function DropdownMenuTrigger({ ...props }) {
    return react.createElement(MenuTrigger/* MenuTrigger */.c, { "data-slot": "dropdown-menu-trigger", ...props });
}
function DropdownMenuContent({ align = 'start', alignOffset = 0, side = 'bottom', sideOffset = 4, className, ...props }) {
    return (react.createElement(MenuPortal/* MenuPortal */.g, null,
        react.createElement(MenuPositioner/* MenuPositioner */.y, { className: "isolate z-50 outline-none", align: align, alignOffset: alignOffset, side: side, sideOffset: sideOffset },
            react.createElement(MenuPopup/* MenuPopup */._, { "data-slot": "dropdown-menu-content", className: cn('data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-32 rounded-md p-1 shadow-md ring-1 duration-100 z-50 max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto outline-none data-closed:overflow-hidden', className), ...props }))));
}
function DropdownMenuGroup({ ...props }) {
    return DropdownMenu_React.createElement(MenuPrimitive.Group, { "data-slot": "dropdown-menu-group", ...props });
}
function DropdownMenuLabel({ className, inset, ...props }) {
    return (react.createElement("div", { "data-slot": "dropdown-menu-label", "data-inset": inset, className: cn('text-muted-foreground px-2 py-1.5 text-xs font-medium data-inset:pl-8', className), ...props }));
}
function DropdownMenuItem({ className, inset, variant = 'default', ...props }) {
    return (react.createElement(MenuItem/* MenuItem */.D, { "data-slot": "dropdown-menu-item", "data-inset": inset, "data-variant": variant, className: cn("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 group/dropdown-menu-item relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0", className), ...props }));
}
function DropdownMenuSub({ ...props }) {
    return DropdownMenu_React.createElement(MenuPrimitive.SubmenuRoot, { "data-slot": "dropdown-menu-sub", ...props });
}
function DropdownMenuSubTrigger({ className, inset, children, ...props }) {
    return (DropdownMenu_React.createElement(MenuPrimitive.SubmenuTrigger, { "data-slot": "dropdown-menu-sub-trigger", "data-inset": inset, className: DropdownMenu_cn("focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4 flex cursor-default items-center outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0", className), ...props },
        children,
        DropdownMenu_React.createElement(ChevronRightIcon, { className: "ml-auto" })));
}
function DropdownMenuSubContent({ align = 'start', alignOffset = -3, side = 'right', sideOffset = 0, className, ...props }) {
    return (DropdownMenu_React.createElement(DropdownMenuContent, { "data-slot": "dropdown-menu-sub-content", className: DropdownMenu_cn('data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground min-w-24 rounded-md p-1 shadow-lg ring-1 duration-100 w-auto', className), align: align, alignOffset: alignOffset, side: side, sideOffset: sideOffset, ...props }));
}
function DropdownMenuCheckboxItem({ className, children, checked, ...props }) {
    return (DropdownMenu_React.createElement(MenuPrimitive.CheckboxItem, { "data-slot": "dropdown-menu-checkbox-item", className: DropdownMenu_cn("focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", className), checked: checked, ...props },
        DropdownMenu_React.createElement("span", { className: "absolute right-2 flex items-center justify-center pointer-events-none", "data-slot": "dropdown-menu-checkbox-item-indicator" },
            DropdownMenu_React.createElement(MenuPrimitive.CheckboxItemIndicator, null,
                DropdownMenu_React.createElement(CheckIcon, null))),
        children));
}
function DropdownMenuRadioGroup({ ...props }) {
    return (DropdownMenu_React.createElement(MenuPrimitive.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...props }));
}
function DropdownMenuRadioItem({ className, children, ...props }) {
    return (DropdownMenu_React.createElement(MenuPrimitive.RadioItem, { "data-slot": "dropdown-menu-radio-item", className: DropdownMenu_cn("focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", className), ...props },
        DropdownMenu_React.createElement("span", { className: "absolute right-2 flex items-center justify-center pointer-events-none", "data-slot": "dropdown-menu-radio-item-indicator" },
            DropdownMenu_React.createElement(MenuPrimitive.RadioItemIndicator, null,
                DropdownMenu_React.createElement(CheckIcon, null))),
        children));
}
function DropdownMenuSeparator({ className, ...props }) {
    return (react.createElement(Separator/* Separator */.w, { "data-slot": "dropdown-menu-separator", className: cn('bg-border -mx-1 my-1 h-px', className), ...props }));
}
function DropdownMenuShortcut({ className, ...props }) {
    return (DropdownMenu_React.createElement("span", { "data-slot": "dropdown-menu-shortcut", className: DropdownMenu_cn('text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground ml-auto text-xs tracking-widest', className), ...props }));
}

//# sourceMappingURL=DropdownMenu.js.map
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/log-out.js
var log_out = __webpack_require__(55042);
// EXTERNAL MODULE: ./node_modules/react-toastify/dist/react-toastify.esm.js + 6 modules
var react_toastify_esm = __webpack_require__(64718);
;// ./node_modules/@evershop/evershop/dist/modules/auth/pages/admin/all/AdminUser.js





function AdminUser({ adminUser, logoutUrl, loginPage }) {
    const logout = async () => {
        const response = await fetch(logoutUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            window.location.href = loginPage;
        }
        else {
            react_toastify_esm/* toast */.oR.error('Logout failed');
        }
    };
    if (!adminUser) {
        return null;
    }
    const { fullName } = adminUser;
    return (react.createElement("div", { className: "admin-user flex grow justify-end items-center" },
        react.createElement("div", { className: "flex justify-items-start gap-2 justify-center" },
            react.createElement(DropdownMenu, null,
                react.createElement(DropdownMenuTrigger, null,
                    react.createElement("button", { className: "w-[2.188rem] h-[2.188rem] flex items-center justify-center rounded-full bg-primary/45 font-semibold border-2 border-primary cursor-pointer hover:bg-primary/60 transition-colors", onClick: (e) => e.preventDefault() }, fullName[0])),
                react.createElement(DropdownMenuContent, { align: "end", className: "w-45" },
                    react.createElement(DropdownMenuLabel, { className: "text-base font-normal" },
                        "Hello ",
                        react.createElement("span", { className: "text-primary" },
                            fullName,
                            "!")),
                    react.createElement(DropdownMenuSeparator, null),
                    react.createElement(DropdownMenuItem, { className: "text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer", onClick: (e) => {
                            e.preventDefault();
                            logout();
                        } },
                        react.createElement("div", { className: "flex justify-start items-center gap-2" },
                            react.createElement(log_out/* default */.A, { className: "w-4 h-4" }),
                            react.createElement("span", null, "Logout"))))))));
}
AdminUser.propTypes = {
    adminUser: prop_types_default().shape({
        email: (prop_types_default()).string.isRequired,
        fullName: (prop_types_default()).string.isRequired
    }),
    loginPage: (prop_types_default()).string.isRequired,
    logoutUrl: (prop_types_default()).string.isRequired
};
AdminUser.defaultProps = {
    adminUser: null
};
const layout = {
    areaId: 'header',
    sortOrder: 50
};
const query = (/* unused pure expression or super */ null && (`
  query Query {
    adminUser: currentAdminUser {
      adminUserId
      fullName
      email
    },
    logoutUrl: url(routeId: "adminLogoutJson"),
    loginPage: url(routeId: "adminLogin")
  }
`));
//# sourceMappingURL=AdminUser.js.map
;// ./node_modules/@evershop/evershop/dist/modules/base/pages/admin/all/FormCss.js
function FormCss() {
    return null;
}
const FormCss_layout = {
    areaId: 'head',
    sortOrder: 5
};
//# sourceMappingURL=FormCss.js.map
;// ./node_modules/@evershop/evershop/dist/modules/base/pages/admin/all/GlobalCss.js

function GlobalCss() {
    return null;
}
const GlobalCss_layout = {
    areaId: 'head',
    sortOrder: 5
};
//# sourceMappingURL=GlobalCss.js.map
;// ./node_modules/@evershop/evershop/dist/modules/base/pages/admin/all/Layout.js


function AdminLayout() {
    return (react.createElement(react.Fragment, null,
        react.createElement("div", { className: "header" },
            react.createElement(common_Area, { id: "header", noOuter: true })),
        react.createElement("div", { className: "content-wrapper" },
            react.createElement("div", { className: "admin-navigation" },
                react.createElement(common_Area, { id: "adminNavigation", noOuter: true })),
            react.createElement("div", { className: "main-content" },
                react.createElement(common_Area, { id: "content", className: "main-content-inner" }),
                react.createElement("div", { className: "footer flex justify-between" },
                    react.createElement(common_Area, { id: "footerLeft", className: "footer-left" }),
                    react.createElement(common_Area, { id: "footerRight", className: "footer-right" }))))));
}
const Layout_layout = {
    areaId: 'body',
    sortOrder: 10
};
//# sourceMappingURL=Layout.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/Meta.js
/* unused harmony import specifier */ var Meta_React;
/* eslint-disable no-console */

const VALID_HTTP_EQUIV = (/* unused pure expression or super */ null && ([
    'content-type',
    'default-style',
    'refresh',
    'x-ua-compatible',
    'content-security-policy'
]));
const REQUIRED_CONTENT_ATTRIBUTES = (/* unused pure expression or super */ null && ([
    'name',
    'property',
    'itemProp',
    'httpEquiv'
]));
function validateMetaProps(props) {
    const errors = [];
    const hasIdentifier = [
        'name',
        'property',
        'itemProp',
        'httpEquiv',
        'charset'
    ].some((attr) => props[attr] !== undefined);
    if (!hasIdentifier) {
        errors.push('Meta tag must have at least one identifier attribute (name, property, itemProp, httpEquiv, or charset)');
    }
    if (props.charset && props.charset.toLowerCase() !== 'utf-8') {
        errors.push('charset attribute must be "utf-8" for HTML5 documents');
    }
    if (props.itemProp && (props.name || props.httpEquiv || props.charset)) {
        errors.push('itemProp attribute cannot be used with name, http-equiv, or charset attributes');
    }
    const needsContent = REQUIRED_CONTENT_ATTRIBUTES.some((attr) => props[attr] !== undefined);
    if (needsContent && !props.content) {
        errors.push('Meta tag with name, property, itemProp, or httpEquiv must have content attribute');
    }
    if (props.media && props.name !== 'theme-color') {
        errors.push('media attribute is only valid when name="theme-color"');
    }
    if (props.httpEquiv && !VALID_HTTP_EQUIV.includes(props.httpEquiv)) {
        errors.push(`Invalid httpEquiv value: ${props.httpEquiv}. Valid values: ${VALID_HTTP_EQUIV.join(', ')}`);
    }
    const identifierCount = ['name', 'property', 'itemProp'].filter((attr) => props[attr] !== undefined).length;
    if (identifierCount > 1) {
        errors.push('Meta tag cannot have multiple identifier attributes (name, property, itemProp)');
    }
    if (props.itemProp) {
        if (props.itemType && !props.itemType.startsWith('http')) {
            errors.push('itemType should be a valid URL (typically schema.org URL)');
        }
    }
    return {
        isValid: errors.length === 0,
        errors
    };
}
function sanitizeMetaProps(props) {
    const allowedAttributes = [
        'charset',
        'name',
        'content',
        'httpEquiv',
        'property',
        'itemProp',
        'itemType',
        'itemId',
        'lang',
        'scheme',
        'media'
    ];
    return Object.keys(props)
        .filter((key) => allowedAttributes.includes(key) &&
        props[key] !== undefined &&
        props[key] !== null)
        .reduce((obj, key) => {
        obj[key] = String(props[key]).trim();
        return obj;
    }, {});
}
function Meta(props) {
    if (false) // removed by dead control flow
{}
    const sanitizedProps = sanitizeMetaProps(props);
    if (Object.keys(sanitizedProps).length === 0) {
        if (false) // removed by dead control flow
{}
        return null;
    }
    return react.createElement("meta", { ...sanitizedProps });
}
function MetaCharset({ charset = 'utf-8' } = {}) {
    return Meta_React.createElement(Meta, { charset: charset });
}
function MetaDescription({ description }) {
    return Meta_React.createElement(Meta, { name: "description", content: description });
}
function MetaKeywords({ keywords }) {
    const keywordString = Array.isArray(keywords)
        ? keywords.join(', ')
        : keywords;
    return Meta_React.createElement(Meta, { name: "keywords", content: keywordString });
}
function MetaAuthor({ author }) {
    return Meta_React.createElement(Meta, { name: "author", content: author });
}
function MetaThemeColor({ color, media }) {
    return Meta_React.createElement(Meta, { name: "theme-color", content: color, media: media });
}
function MetaViewport({ width = 'device-width', initialScale = 1, maximumScale, userScalable = true }) {
    const parts = [`width=${width}`, `initial-scale=${initialScale}`];
    if (maximumScale !== undefined) {
        parts.push(`maximum-scale=${maximumScale}`);
    }
    if (!userScalable) {
        parts.push('user-scalable=no');
    }
    return Meta_React.createElement(Meta, { name: "viewport", content: parts.join(', ') });
}
function MetaHttpEquiv({ httpEquiv, content }) {
    return Meta_React.createElement(Meta, { httpEquiv: httpEquiv, content: content });
}
function MetaOpenGraph({ type, title, description, image, url, siteName }) {
    return (Meta_React.createElement(Meta_React.Fragment, null,
        type && Meta_React.createElement(Meta, { property: "og:type", content: type }),
        title && Meta_React.createElement(Meta, { property: "og:title", content: title }),
        description && Meta_React.createElement(Meta, { property: "og:description", content: description }),
        image && Meta_React.createElement(Meta, { property: "og:image", content: image }),
        url && Meta_React.createElement(Meta, { property: "og:url", content: url }),
        siteName && Meta_React.createElement(Meta, { property: "og:site_name", content: siteName })));
}
function MetaTwitterCard({ card = 'summary', site, creator, title, description, image }) {
    return (Meta_React.createElement(Meta_React.Fragment, null,
        Meta_React.createElement(Meta, { name: "twitter:card", content: card }),
        site && Meta_React.createElement(Meta, { name: "twitter:site", content: site }),
        creator && Meta_React.createElement(Meta, { name: "twitter:creator", content: creator }),
        title && Meta_React.createElement(Meta, { name: "twitter:title", content: title }),
        description && Meta_React.createElement(Meta, { name: "twitter:description", content: description }),
        image && Meta_React.createElement(Meta, { name: "twitter:image", content: image })));
}
function MetaRobots({ index = true, follow = true, noarchive = false, nosnippet = false }) {
    const directives = [
        index ? 'index' : 'noindex',
        follow ? 'follow' : 'nofollow'
    ];
    if (noarchive)
        directives.push('noarchive');
    if (nosnippet)
        directives.push('nosnippet');
    return Meta_React.createElement(Meta, { name: "robots", content: directives.join(', ') });
}
//# sourceMappingURL=Meta.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/Title.js
/* unused harmony import specifier */ var Title_React;
/* eslint-disable no-console */

/**
 * Validates title content for SEO and accessibility best practices
 */
const validateTitle = (title, maxLength) => {
    if (false) // removed by dead control flow
{}
};
/**
 * Formats the complete title string with optional prefix/suffix
 */
const formatTitle = (title, prefix, suffix, separator = ' - ', maxLength) => {
    const parts = [];
    if (prefix)
        parts.push(prefix);
    parts.push(title);
    if (suffix)
        parts.push(suffix);
    let formattedTitle = parts.join(separator);
    // Truncate if needed
    if (maxLength && formattedTitle.length > maxLength) {
        // Try to truncate at word boundaries
        const truncated = formattedTitle.substring(0, maxLength - 3);
        const lastSpace = truncated.lastIndexOf(' ');
        if (lastSpace > formattedTitle.length * 0.7) {
            formattedTitle = truncated.substring(0, lastSpace) + '...';
        }
        else {
            formattedTitle = truncated + '...';
        }
    }
    return formattedTitle;
};
/**
 * Title component that renders an HTML <title> element with SEO and accessibility best practices.
 *
 * The title element is crucial for:
 * - SEO: Search engines use it as the clickable headline in search results
 * - Accessibility: Screen readers announce the page title when users navigate to the page
 * - User Experience: Displayed in browser tabs and bookmarks
 *
 * SEO Best Practices:
 * - Keep titles between 30-60 characters (55-60 optimal for Google)
 * - Make each page title unique within your site
 * - Put important keywords first
 * - Avoid keyword stuffing
 * - Use descriptive, readable titles that entice clicks
 *
 * @example
 * // Basic usage
 * <Title title="About Us" />
 *
 * @example
 * // With site branding
 * <Title
 *   title="Product Details"
 *   suffix="EverShop"
 *   separator=" | "
 * />
 *
 * @example
 * // E-commerce product page
 * <Title
 *   title="iPhone 14 Pro Max - 256GB Space Black"
 *   suffix="TechStore"
 *   maxLength={60}
 * />
 *
 * @example
 * // Blog post
 * <Title
 *   title="10 Tips for Better React Performance"
 *   suffix="Developer Blog"
 * />
 *
 * @example
 * // Error page
 * <Title
 *   title="Page Not Found (404)"
 *   suffix="EverShop"
 * />
 */
function Title({ title, prefix, suffix, separator = ' - ', maxLength, ...otherProps }) {
    // Format the complete title
    const formattedTitle = formatTitle(title, prefix, suffix, separator, maxLength);
    // Validate in development
    validateTitle(formattedTitle, maxLength);
    return react.createElement("title", { ...otherProps }, formattedTitle);
}
/**
 * Convenience component for product page titles
 */
function ProductTitle({ productName, category, brand, siteName, separator = ' - ', maxLength = 60, ...props }) {
    const titleParts = [productName];
    if (category)
        titleParts.push(category);
    if (brand)
        titleParts.push(brand);
    const title = titleParts.join(' ');
    return (Title_React.createElement(Title, { title: title, suffix: siteName, separator: separator, maxLength: maxLength, ...props }));
}
/**
 * Convenience component for category/collection page titles
 */
function CategoryTitle({ categoryName, itemCount, siteName, separator = ' - ', maxLength = 60, ...props }) {
    let title = categoryName;
    if (itemCount !== undefined) {
        title += ` (${itemCount} items)`;
    }
    return (Title_React.createElement(Title, { title: title, suffix: siteName, separator: separator, maxLength: maxLength, ...props }));
}
/**
 * Convenience component for error page titles
 */
function ErrorTitle({ errorCode, errorMessage, siteName, separator = ' - ', ...props }) {
    const title = errorMessage
        ? `${errorMessage} (${errorCode})`
        : `Error ${errorCode}`;
    return (Title_React.createElement(Title, { title: title, suffix: siteName, separator: separator, ...props }));
}
/**
 * Convenience component for search result page titles
 */
function SearchTitle({ query, resultCount, siteName, separator = ' - ', maxLength = 60, ...props }) {
    let title = `Search: ${query}`;
    if (resultCount !== undefined) {
        title += ` (${resultCount} results)`;
    }
    return (Title_React.createElement(Title, { title: title, suffix: siteName, separator: separator, maxLength: maxLength, ...props }));
}
//# sourceMappingURL=Title.js.map
;// ./node_modules/@evershop/evershop/dist/modules/base/pages/admin/all/Meta.js



function SeoMeta({ pageInfo: { title, description } }) {
    return (react.createElement(react.Fragment, null,
        react.createElement(Title, { title: title }),
        react.createElement(Meta, { name: "description", content: description })));
}
const Meta_layout = {
    areaId: 'head',
    sortOrder: 5
};
const Meta_query = (/* unused pure expression or super */ null && (`
  query query {
    pageInfo {
      title
      description
    }
  }
`));
//# sourceMappingURL=Meta.js.map
;// ./node_modules/@evershop/evershop/dist/modules/base/pages/admin/all/TailwindCss.js

function TailwindCss() {
    return null;
}
const TailwindCss_layout = {
    areaId: 'head',
    sortOrder: 1
};
//# sourceMappingURL=TailwindCss.js.map
;// ./node_modules/@evershop/evershop/dist/components/admin/NavigationItem.js


function NavigationItem({ Icon, url, title }) {
    const [isActive, setIsActive] = react.useState(false);
    react.useEffect(() => {
        const checkActive = () => {
            const currentUrl = window.location.href;
            const currentUrlObj = new URL(currentUrl);
            const menuUrlObj = new URL(url);
            const currentPath = currentUrlObj.pathname;
            const menuPath = menuUrlObj.pathname;
            if (currentPath === menuPath) {
                setIsActive(true);
                return;
            }
            const menuSegments = menuPath.split('/').filter(Boolean);
            if (menuSegments.length >= 2 && currentPath.startsWith(menuPath + '/')) {
                const remainingPath = currentPath.substring(menuPath.length + 1);
                const nextSegment = remainingPath.split('/')[0];
                const actionWords = ['new', 'create', 'add'];
                if (!actionWords.includes(nextSegment.toLowerCase())) {
                    setIsActive(true);
                    return;
                }
            }
            setIsActive(false);
        };
        checkActive();
    }, [url]);
    return (react.createElement("li", { className: isActive ? 'active nav-item' : 'nav-item' },
        react.createElement("a", { href: url, className: "flex justify-left" },
            react.createElement("i", { className: "menu-icon" },
                react.createElement(Icon, null)),
            title)));
}
//# sourceMappingURL=NavigationItem.js.map
;// ./node_modules/@evershop/evershop/dist/components/admin/NavigationItemGroup.js




function NavigationItemGroup({ id, name, items = [], Icon = null, url = null }) {
    return (react.createElement("li", { className: "root-nav-item nav-item" },
        react.createElement("div", { className: "flex justify-between items-center" },
            react.createElement("div", { className: "root-label flex justify-between items-center" },
                Icon && (react.createElement("span", null,
                    react.createElement(Icon, null))),
                !url && react.createElement("span", null, name),
                url && react.createElement("a", { href: url }, name))),
        react.createElement("ul", { className: "item-group" },
            react.createElement(common_Area, { id: id, noOuter: true, coreComponents: items.map((item) => ({
                    component: {
                        default: () => (react.createElement(NavigationItem, { Icon: item.Icon, url: item.url, title: item.title }))
                    }
                })) }))));
}
NavigationItemGroup.defaultProps = {
    items: [],
    Icon: null,
    url: null
};
//# sourceMappingURL=NavigationItemGroup.js.map
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/box.js
var box = __webpack_require__(52036);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/link.js
var icons_link = __webpack_require__(82853);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/tag.js
var tag = __webpack_require__(43197);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/hash.js
var hash = __webpack_require__(40073);
;// ./node_modules/@evershop/evershop/dist/modules/catalog/pages/admin/all/CatalogMenuGroup.js




function CatalogMenuGroup({ productGrid, categoryGrid, attributeGrid, collectionGrid }) {
    return (react.createElement(NavigationItemGroup, { id: "catalogMenuGroup", name: "Catalog", items: [
            {
                Icon: box/* default */.A,
                url: productGrid,
                title: 'Products'
            },
            {
                Icon: icons_link/* default */.A,
                url: categoryGrid,
                title: 'Categories'
            },
            {
                Icon: tag/* default */.A,
                url: collectionGrid,
                title: 'Collections'
            },
            {
                Icon: hash/* default */.A,
                url: attributeGrid,
                title: 'Attributes'
            }
        ] }));
}
CatalogMenuGroup.propTypes = {
    attributeGrid: (prop_types_default()).string.isRequired,
    categoryGrid: (prop_types_default()).string.isRequired,
    collectionGrid: (prop_types_default()).string.isRequired,
    productGrid: (prop_types_default()).string.isRequired
};
const CatalogMenuGroup_layout = {
    areaId: 'adminMenu',
    sortOrder: 20
};
const CatalogMenuGroup_query = (/* unused pure expression or super */ null && (`
  query Query {
    productGrid: url(routeId:"productGrid")
    categoryGrid: url(routeId:"categoryGrid")
    attributeGrid: url(routeId:"attributeGrid")
    collectionGrid: url(routeId:"collectionGrid")
  }
`));
//# sourceMappingURL=CatalogMenuGroup.js.map
;// ./node_modules/@evershop/evershop/dist/modules/catalog/pages/admin/all/NewProductQuickLink.js




function NewProductQuickLink({ productNew }) {
    return react.createElement(NavigationItem, { Icon: box/* default */.A, title: "New Product", url: productNew });
}
NewProductQuickLink.propTypes = {
    productNew: (prop_types_default()).string.isRequired
};
const NewProductQuickLink_layout = {
    areaId: 'quickLinks',
    sortOrder: 20
};
const NewProductQuickLink_query = (/* unused pure expression or super */ null && (`
  query Query {
    productNew: url(routeId:"productNew")
  }
`));
//# sourceMappingURL=NewProductQuickLink.js.map
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/merge-props/mergeProps.js
var mergeProps = __webpack_require__(10866);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/use-render/useRender.js
var useRender = __webpack_require__(92834);
;// ./node_modules/@evershop/evershop/dist/components/common/ui/Separator.js
/* unused harmony import specifier */ var SeparatorPrimitive;
/* unused harmony import specifier */ var Separator_cn;
/* unused harmony import specifier */ var Separator_React;



function Separator_Separator({ className, orientation = 'horizontal', ...props }) {
    return (Separator_React.createElement(SeparatorPrimitive, { "data-slot": "separator", orientation: orientation, className: Separator_cn('bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch', className), ...props }));
}

//# sourceMappingURL=Separator.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/ui/Item.js
/* unused harmony import specifier */ var Item_Separator;
/* unused harmony import specifier */ var Item_cn;
/* unused harmony import specifier */ var Item_React;






function ItemGroup({ className, ...props }) {
    return (Item_React.createElement("div", { role: "list", "data-slot": "item-group", className: Item_cn('gap-4 has-[[data-size=sm]]:gap-2.5 has-[[data-size=xs]]:gap-2 group/item-group flex w-full flex-col', className), ...props }));
}
function ItemSeparator({ className, ...props }) {
    return (Item_React.createElement(Item_Separator, { "data-slot": "item-separator", orientation: "horizontal", className: Item_cn('my-2', className), ...props }));
}
const itemVariants = (0,dist/* cva */.F)('[a]:hover:bg-muted rounded-md border text-sm w-full group/item focus-visible:border-ring focus-visible:ring-ring/50 flex items-center flex-wrap outline-none transition-colors duration-100 focus-visible:ring-[3px] [a]:transition-colors', {
    variants: {
        variant: {
            default: 'border-transparent',
            outline: 'border-border',
            muted: 'bg-muted/50 border-transparent'
        },
        size: {
            default: 'gap-3.5 px-4 py-3.5',
            sm: 'gap-2.5 px-3 py-2.5',
            xs: 'gap-2 px-2.5 py-2 [[data-slot=dropdown-menu-content]_&]:p-0'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Item({ className, variant = 'default', size = 'default', render, ...props }) {
    return (0,useRender/* useRender */.C)({
        defaultTagName: 'div',
        props: (0,mergeProps/* mergeProps */.v6)({
            className: cn(itemVariants({ variant, size, className }))
        }, props),
        render,
        state: {
            slot: 'item',
            variant,
            size
        }
    });
}
const itemMediaVariants = (0,dist/* cva */.F)('gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start flex shrink-0 items-center justify-center [&_svg]:pointer-events-none', {
    variants: {
        variant: {
            default: 'bg-transparent',
            icon: "[&_svg:not([class*='size-'])]:size-4",
            image: 'size-10 overflow-hidden rounded-sm group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function ItemMedia({ className, variant = 'default', ...props }) {
    return (Item_React.createElement("div", { "data-slot": "item-media", "data-variant": variant, className: Item_cn(itemMediaVariants({ variant, className })), ...props }));
}
function ItemContent({ className, ...props }) {
    return (react.createElement("div", { "data-slot": "item-content", className: cn('gap-1 group-data-[size=xs]/item:gap-0 flex flex-1 flex-col [&+[data-slot=item-content]]:flex-none', className), ...props }));
}
function ItemTitle({ className, ...props }) {
    return (react.createElement("div", { "data-slot": "item-title", className: cn('gap-2 text-sm leading-snug font-medium underline-offset-4 line-clamp-1 flex w-fit items-center', className), ...props }));
}
function ItemDescription({ className, ...props }) {
    return (react.createElement("p", { "data-slot": "item-description", className: cn('text-muted-foreground text-left text-sm leading-normal group-data-[size=xs]/item:text-xs [&>a:hover]:text-primary line-clamp-2 font-normal [&>a]:underline [&>a]:underline-offset-4', className), ...props }));
}
function ItemActions({ className, ...props }) {
    return (react.createElement("div", { "data-slot": "item-actions", className: cn('gap-2 flex items-center', className), ...props }));
}
function ItemHeader({ className, ...props }) {
    return (Item_React.createElement("div", { "data-slot": "item-header", className: Item_cn('gap-2 flex basis-full items-center justify-between', className), ...props }));
}
function ItemFooter({ className, ...props }) {
    return (Item_React.createElement("div", { "data-slot": "item-footer", className: Item_cn('gap-2 flex basis-full items-center justify-between', className), ...props }));
}

//# sourceMappingURL=Item.js.map
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/settings.js
var settings = __webpack_require__(80964);
;// ./node_modules/@evershop/evershop/dist/modules/checkout/pages/admin/all/ShippingSettingMenu.js





function ShippingSettingMenu({ shippingSettingUrl }) {
    const isActive = typeof window !== 'undefined' &&
        new URL(shippingSettingUrl, window.location.origin).pathname ===
            window.location.pathname;
    return (react.createElement(Item, { variant: 'outline', className: cn(isActive && 'bg-primary/5 border-primary/20 dark:bg-primary/10'), "data-active": isActive ? 'true' : 'false' },
        react.createElement(ItemContent, null,
            react.createElement(ItemTitle, null,
                react.createElement("div", null,
                    react.createElement("a", { href: shippingSettingUrl, className: cn('uppercase text-xs font-semibold', isActive && 'text-primary') }, "Shipping Setting"))),
            react.createElement(ItemDescription, null,
                react.createElement("div", null, "Where you ship, shipping methods and delivery fee"))),
        react.createElement(ItemActions, null,
            react.createElement(Button_Button, { variant: "outline", size: "sm", onClick: () => (window.location.href = shippingSettingUrl) },
                react.createElement(settings/* default */.A, { className: "h-4 w-4 mr-1" })))));
}
const ShippingSettingMenu_layout = {
    areaId: 'settingPageMenu',
    sortOrder: 15
};
const ShippingSettingMenu_query = (/* unused pure expression or super */ null && (`
  query Query {
    shippingSettingUrl: url(routeId: "shippingSetting")
  }
`));
//# sourceMappingURL=ShippingSettingMenu.js.map
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/book.js
var book = __webpack_require__(45244);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/puzzle.js
var puzzle = __webpack_require__(49129);
;// ./node_modules/@evershop/evershop/dist/modules/cms/pages/admin/all/CmsMenuGroup.js




function CmsMenuGroup({ cmsPageGrid, widgetGrid }) {
    return (react.createElement(NavigationItemGroup, { id: "cmsMenuGroup", name: "CMS", items: [
            {
                Icon: book/* default */.A,
                url: cmsPageGrid,
                title: 'Pages'
            },
            {
                Icon: puzzle/* default */.A,
                url: widgetGrid,
                title: 'Widgets'
            }
        ] }));
}
CmsMenuGroup.propTypes = {
    cmsPageGrid: (prop_types_default()).string.isRequired,
    widgetGrid: (prop_types_default()).string.isRequired
};
const CmsMenuGroup_layout = {
    areaId: 'adminMenu',
    sortOrder: 60
};
const CmsMenuGroup_query = (/* unused pure expression or super */ null && (`
  query Query {
    cmsPageGrid: url(routeId:"cmsPageGrid")
    widgetGrid: url(routeId:"widgetGrid")
  }
`));
//# sourceMappingURL=CmsMenuGroup.js.map
;// ./node_modules/@evershop/evershop/dist/modules/cms/pages/admin/all/CopyRight.js

function CopyRight({ themeConfig: { copyRight } }) {
    return (react.createElement("div", { className: "copyright" },
        react.createElement("span", null, copyRight)));
}
CopyRight.defaultProps = {
    themeConfig: {
        copyRight: '© 2025 Evershop. All Rights Reserved.'
    }
};
const CopyRight_layout = {
    areaId: 'footerLeft',
    sortOrder: 10
};
const CopyRight_query = (/* unused pure expression or super */ null && (`
  query query {
    themeConfig {
      copyRight
    }
  }
`));
//# sourceMappingURL=CopyRight.js.map
;// ./node_modules/@evershop/evershop/dist/modules/cms/pages/admin/all/Logo.js

function Logo({ dashboardUrl }) {
    return (react.createElement("div", { className: "logo w-9 h-auto flex items-center" },
        react.createElement("a", { href: dashboardUrl, className: "flex items-end" },
            react.createElement("svg", { width: "256", height: "282", viewBox: "0 0 256 282", fill: "none", className: "w-8 h-auto", xmlns: "http://www.w3.org/2000/svg" },
                react.createElement("path", { d: "M63.6632 35.0703L0.336842 70.1406L0.134737 140.668L0 211.26L63.7305 246.459C98.7621 265.799 127.663 281.658 128 281.658C128.337 281.658 145.785 272.117 166.872 260.513C187.891 248.844 216.589 233.05 230.602 225.314L256 211.26V196.174V181.024L254.518 181.798C253.642 182.249 224.943 198.044 190.72 216.997C156.429 235.951 128.067 251.294 127.663 251.229C127.192 251.101 104.556 238.723 77.2716 223.637L27.6211 196.239V140.797V85.3549L50.0547 72.9771C62.3158 66.2081 84.8168 53.8303 99.9747 45.4496C115.065 37.0688 127.731 30.2353 128 30.2353C128.269 30.2353 145.853 39.8409 167.074 51.574L228.918 85.3549L238.672 79.8626L256 70.1406L228.918 55.3775C207.495 43.2577 128.472 -0.0643921 127.798 9.15527e-05C127.394 9.15527e-05 98.4926 15.7946 63.6632 35.0703Z", fill: "#008060" }),
                react.createElement("path", { d: "M192.674 105.146C158.046 124.293 129.213 140.152 128.606 140.281C127.933 140.475 111.023 131.449 88.9937 119.329L50.5263 98.055V113.334L50.5937 128.548L87.9832 149.178C108.531 160.524 126.046 170.065 126.922 170.387C128.269 170.839 137.701 165.875 191.731 136.026C226.493 116.751 255.192 100.827 255.528 100.569C255.798 100.311 255.933 93.4133 255.865 85.226L255.663 70.334L192.674 105.146Z", fill: "#008060" }),
                react.createElement("path", { d: "M248.926 129.451C245.221 131.449 216.657 147.244 185.398 164.521C154.139 181.798 128.337 195.917 128 195.917C127.663 195.917 110.215 186.375 89.1284 174.771L50.8632 153.626L50.6611 168.453C50.5263 179.8 50.7284 183.474 51.3347 184.055C52.6147 185.15 127.192 226.216 128 226.216C128.674 226.216 254.451 156.914 255.528 156.011C255.798 155.753 255.933 148.855 255.865 140.603L255.663 125.712L248.926 129.451Z", fill: "#008060" })))));
}
const Logo_layout = {
    areaId: 'header',
    sortOrder: 10
};
const Logo_query = (/* unused pure expression or super */ null && (`
  query query {
    dashboardUrl: url(routeId:"dashboard")
  }
`));
//# sourceMappingURL=Logo.js.map
;// ./node_modules/@evershop/evershop/dist/modules/cms/pages/admin/all/Navigation.js



function AdminNavigation() {
    return (react.createElement("div", { className: "admin-nav-container" },
        react.createElement("div", { className: "admin-nav" },
            react.createElement("ul", { className: "list-unstyled" },
                react.createElement(common_Area, { id: "adminMenu", noOuter: true })))));
}
const Navigation_layout = {
    areaId: 'adminNavigation',
    sortOrder: 10
};
//# sourceMappingURL=Navigation.js.map
;// ./node_modules/@evershop/evershop/dist/lib/util/get.js
/**
 * Get the value base on the path
 *
 * @param   {object}  obj           The Data object
 * @param   {string}  path          The path of the property "a.b.c"
 * @param   {any}  defaultValue     The default value in case the path is not existed
 *
 * @return  {any}                   The value
 */
function get(obj, path, defaultValue) {
    const pathSplit = path.split('.');
    let current = obj;
    while (pathSplit.length) {
        if (typeof current !== 'object' || current === null) {
            return defaultValue;
        }
        const key = pathSplit.shift();
        if (!(key in current)) {
            return defaultValue;
        }
        current = current[key];
    }
    return current === undefined || current === null
        ? defaultValue
        : current;
}
//# sourceMappingURL=get.js.map
;// ./node_modules/@evershop/evershop/dist/modules/cms/pages/admin/all/Notification.js





function Notification() {
    const notify = (type, message) => {
        switch (type) {
            case 'success':
                react_toastify_esm/* toast */.oR.success(message);
                break;
            case 'error':
                react_toastify_esm/* toast */.oR.error(message);
                break;
            case 'info':
                react_toastify_esm/* toast */.oR.info(message);
                break;
            case 'warning':
                react_toastify_esm/* toast */.oR.warning(message);
                break;
            default:
                (0,react_toastify_esm/* toast */.oR)(message);
        }
    };
    const context = useAppState();
    react.useEffect(() => {
        get(context, 'notifications', []).forEach((n) => notify(n.type, n.message));
    }, []);
    return (react.createElement("div", null,
        react.createElement(react_toastify_esm/* ToastContainer */.N9, { hideProgressBar: true, autoClose: false })));
}
const Notification_layout = {
    areaId: 'body',
    sortOrder: 10
};
//# sourceMappingURL=Notification.js.map
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/house.js
var house = __webpack_require__(91805);
;// ./node_modules/@evershop/evershop/dist/modules/cms/pages/admin/all/QuickLinks.js




function QuickLinks({ dashboard }) {
    return (react.createElement(NavigationItemGroup, { id: "quickLinks", name: "Quick links", items: [
            {
                Icon: house/* default */.A,
                url: dashboard,
                title: 'Dashboard'
            }
        ] }));
}
QuickLinks.propTypes = {
    dashboard: (prop_types_default()).string.isRequired
};
const QuickLinks_layout = {
    areaId: 'adminMenu',
    sortOrder: 10
};
const QuickLinks_query = (/* unused pure expression or super */ null && (`
  query Query {
    dashboard: url(routeId: "dashboard")
  }
`));
//# sourceMappingURL=QuickLinks.js.map
;// ./node_modules/@evershop/evershop/dist/components/admin/Spinner.js


function Spinner_Spinner({ width, height }) {
    return (react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", style: { margin: 'auto' }, width: width, height: height, display: "block", preserveAspectRatio: "xMidYMid", viewBox: "0 0 100 100" },
        react.createElement("g", { transform: "translate(50 50) scale(.7)" },
            react.createElement("circle", { r: "50", className: "fill-primary" }),
            react.createElement("circle", { cy: "-28", r: "15", className: "fill-secondary" },
                react.createElement("animateTransform", { attributeName: "transform", dur: "1s", keyTimes: "0;1", repeatCount: "indefinite", type: "rotate", values: "0 0 0;360 0 0" })))));
}
Spinner_Spinner.propTypes = {
    width: prop_types.number,
    height: prop_types.number
};
Spinner_Spinner.defaultProps = {
    width: 60,
    height: 60
};
/* harmony default export */ const admin_Spinner = (Spinner_Spinner);
//# sourceMappingURL=Spinner.js.map
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/input/Input.js + 1 modules
var Input = __webpack_require__(84527);
;// ./node_modules/@evershop/evershop/dist/components/common/ui/Input.js



const Input_Input = react.forwardRef(({ className, type, ...props }, ref) => {
    return (react.createElement(Input/* Input */.p, { ref: ref, type: type, "data-slot": "input", className: cn('dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 h-9 rounded-md border bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] file:h-7 file:text-sm file:font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] md:text-sm file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50', className), ...props }));
});
Input_Input.displayName = 'Input';

//# sourceMappingURL=Input.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/ui/Textarea.js


const Textarea = react.forwardRef(({ className, ...props }, ref) => {
    return (react.createElement("textarea", { ref: ref, "data-slot": "textarea", className: cn('border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border bg-transparent px-2.5 py-2 text-base shadow-xs transition-[color,box-shadow] focus-visible:ring-[3px] aria-invalid:ring-[3px] md:text-sm placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full outline-none disabled:cursor-not-allowed disabled:opacity-50', className), ...props }));
});
Textarea.displayName = 'Textarea';

//# sourceMappingURL=Textarea.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/ui/InputGroup.js
/* eslint-disable jsx-a11y/click-events-have-key-events */






const InputGroup = react.forwardRef(({ className, ...props }, ref) => {
    return (react.createElement("div", { ref: ref, "data-slot": "input-group", role: "group", className: cn('border-input dark:bg-input/30 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 h-9 rounded-md border shadow-xs transition-[color,box-shadow] has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot][aria-invalid=true]]:ring-[3px] has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5 [[data-slot=combobox-content]_&]:focus-within:border-inherit [[data-slot=combobox-content]_&]:focus-within:ring-0 group/input-group relative flex w-full min-w-0 items-center outline-none has-[>textarea]:h-auto', className), ...props }));
});
InputGroup.displayName = 'InputGroup';
const inputGroupAddonVariants = (0,dist/* cva */.F)("text-muted-foreground h-auto gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4 flex cursor-text items-center justify-center select-none", {
    variants: {
        align: {
            'inline-start': 'pl-2 has-[>button]:ml-[-0.25rem] has-[>kbd]:ml-[-0.15rem] order-first',
            'inline-end': 'pr-2 has-[>button]:mr-[-0.25rem] has-[>kbd]:mr-[-0.15rem] order-last',
            'block-start': 'px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2 order-first w-full justify-start',
            'block-end': 'px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2 order-last w-full justify-start'
        }
    },
    defaultVariants: {
        align: 'inline-start'
    }
});
const InputGroupAddon = react.forwardRef(({ className, align = 'inline-start', ...props }, ref) => {
    return (react.createElement("div", { ref: ref, role: "group", "data-slot": "input-group-addon", "data-align": align, className: cn(inputGroupAddonVariants({ align }), className), onClick: (e) => {
            var _a, _b;
            if (e.target.closest('button')) {
                return;
            }
            (_b = (_a = e.currentTarget.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('input')) === null || _b === void 0 ? void 0 : _b.focus();
        }, ...props }));
});
InputGroupAddon.displayName = 'InputGroupAddon';
const inputGroupButtonVariants = (0,dist/* cva */.F)('gap-2 text-sm shadow-none flex items-center', {
    variants: {
        size: {
            xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
            sm: '',
            'icon-xs': 'size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0',
            'icon-sm': 'size-8 p-0 has-[>svg]:p-0'
        }
    },
    defaultVariants: {
        size: 'xs'
    }
});
const InputGroupButton = react.forwardRef(({ className, type = 'button', variant = 'ghost', size = 'xs', ...props }, ref) => {
    return (react.createElement(Button_Button, { ref: ref, type: type, "data-size": size, variant: variant, className: cn(inputGroupButtonVariants({ size }), className), ...props }));
});
InputGroupButton.displayName = 'InputGroupButton';
const InputGroupText = react.forwardRef(({ className, ...props }, ref) => {
    return (react.createElement("span", { ref: ref, className: cn("text-muted-foreground gap-2 text-sm [&_svg:not([class*='size-'])]:size-4 flex items-center [&_svg]:pointer-events-none", className), ...props }));
});
InputGroupText.displayName = 'InputGroupText';
const InputGroupInput = react.forwardRef(({ className, ...props }, ref) => {
    return (react.createElement(Input_Input, { ref: ref, "data-slot": "input-group-control", className: cn('rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent flex-1', className), ...props }));
});
InputGroupInput.displayName = 'InputGroupInput';
const InputGroupTextarea = react.forwardRef(({ className, ...props }, ref) => {
    return (react.createElement(Textarea, { ref: ref, "data-slot": "input-group-control", className: cn('rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent flex-1 resize-none', className), ...props }));
});
InputGroupTextarea.displayName = 'InputGroupTextarea';

//# sourceMappingURL=InputGroup.js.map
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/search.js
var search = __webpack_require__(98445);
;// ./node_modules/@evershop/evershop/dist/modules/cms/pages/admin/all/search/NoResult.js

function NoResult({ keyword = '', resourseLinks = [] }) {
    return (react.createElement("div", { className: "items-center text-center" },
        react.createElement("h3", { className: "text-xl font-semibold text-muted-foreground" },
            "No results for \"",
            keyword,
            "\""),
        react.createElement("div", { className: "grid grid-cols-2 mt-2" }, resourseLinks.map((link, index) => (react.createElement("div", { key: index, className: "flex space-x-2 justify-center items-center" },
            react.createElement("a", { href: link.url, className: "text-divider hover:underline" }, link.name)))))));
}
//# sourceMappingURL=NoResult.js.map
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/tabs/root/TabsRoot.js
var TabsRoot = __webpack_require__(77970);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/tabs/list/TabsList.js
var TabsList = __webpack_require__(47094);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/tabs/tab/TabsTab.js
var TabsTab = __webpack_require__(80332);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/tabs/panel/TabsPanel.js + 1 modules
var TabsPanel = __webpack_require__(99171);
;// ./node_modules/@evershop/evershop/dist/components/common/ui/Tabs.js




function Tabs({ className, orientation = 'horizontal', ...props }) {
    return (react.createElement(TabsRoot/* TabsRoot */.p, { "data-slot": "tabs", "data-orientation": orientation, className: cn('gap-2 group/tabs flex data-[orientation=horizontal]:flex-col', className), ...props }));
}
const tabsListVariants = (0,dist/* cva */.F)('rounded-lg p-[3px] group-data-horizontal/tabs:h-9 data-[variant=line]:rounded-none group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col', {
    variants: {
        variant: {
            default: 'bg-muted',
            line: 'gap-1 bg-transparent'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Tabs_TabsList({ className, variant = 'default', ...props }) {
    return (react.createElement(TabsList/* TabsList */.j, { "data-slot": "tabs-list", "data-variant": variant, className: cn(tabsListVariants({ variant }), className), ...props }));
}
function TabsTrigger({ className, ...props }) {
    return (react.createElement(TabsTab/* TabsTab */.M, { "data-slot": "tabs-trigger", className: cn("gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg:not([class*='size-'])]:size-4 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground/60 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center whitespace-nowrap transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", 'group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent', 'data-active:bg-background dark:data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 data-active:text-foreground', 'after:bg-foreground after:absolute after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100', className), ...props }));
}
function TabsContent({ className, ...props }) {
    return (react.createElement(TabsPanel/* TabsPanel */.R, { "data-slot": "tabs-content", className: cn('text-sm flex-1 outline-none', className), ...props }));
}

//# sourceMappingURL=Tabs.js.map
;// ./node_modules/@evershop/evershop/dist/modules/cms/pages/admin/all/search/Results.js



function Results({ keyword, results = {} }) {
    const { customers = [], products = [], orders = [] } = results;
    // Determine which tabs have data
    const availableTabs = [];
    if (products.items.length > 0)
        availableTabs.push('products');
    if (customers.items.length > 0)
        availableTabs.push('customers');
    if (orders.items.length > 0)
        availableTabs.push('orders');
    // Default to first available tab
    const defaultTab = availableTabs[0] || 'products';
    return (react.createElement("div", { className: "space-y-3" },
        react.createElement("h3", { className: "text-xl font-semibold" },
            "Results for \"",
            keyword,
            "\""),
        react.createElement(Tabs, { defaultValue: defaultTab },
            react.createElement(Tabs_TabsList, { variant: "line" },
                products.items.length > 0 && (react.createElement(TabsTrigger, { value: "products" },
                    "Products (",
                    products.items.length,
                    ")")),
                customers.items.length > 0 && (react.createElement(TabsTrigger, { value: "customers" },
                    "Customers (",
                    customers.items.length,
                    ")")),
                orders.items.length > 0 && (react.createElement(TabsTrigger, { value: "orders" },
                    "Orders (",
                    orders.items.length,
                    ")"))),
            products.items.length > 0 && (react.createElement(TabsContent, { value: "products", className: "max-h-60 overflow-y-auto" },
                react.createElement("div", { className: "flex flex-col space-y-1" }, products.items.map((product, index) => (react.createElement("a", { href: product.url, key: index, className: "rounded py-2 px-2 hover:bg-muted block" },
                    react.createElement("div", { className: "font-bold" }, product.name),
                    react.createElement("div", { className: "text-sm text-muted-foreground" },
                        "#",
                        product.sku))))))),
            customers.items.length > 0 && (react.createElement(TabsContent, { value: "customers", className: "max-h-60 overflow-y-auto" },
                react.createElement("div", { className: "flex flex-col space-y-1" }, customers.items.map((customer, index) => (react.createElement("a", { href: customer.url, key: index, className: "rounded py-2 px-2 hover:bg-muted block" },
                    react.createElement("div", { className: "font-bold" }, customer.fullName),
                    react.createElement("div", { className: "text-sm text-muted-foreground" }, customer.email))))))),
            orders.items.length > 0 && (react.createElement(TabsContent, { value: "orders", className: "max-h-60 overflow-y-auto" },
                react.createElement("div", { className: "flex flex-col space-y-1" }, orders.items.map((order, index) => (react.createElement("a", { href: order.url, key: index, className: "rounded py-2 px-2 hover:bg-muted block" },
                    react.createElement("div", { className: "font-bold" },
                        "#",
                        order.orderNumber),
                    react.createElement("div", { className: "text-sm text-muted-foreground" }, order.email))))))))));
}
Results.propTypes = {
    keyword: prop_types.string,
    results: prop_types.arrayOf(prop_types.shape({
        items: prop_types.arrayOf(prop_types.shape({
            url: prop_types.string,
            name: prop_types.string,
            description: prop_types.string
        }))
    }))
};
Results.defaultProps = {
    keyword: undefined,
    results: []
};
//# sourceMappingURL=Results.js.map
;// ./node_modules/@evershop/evershop/dist/modules/cms/pages/admin/all/SearchBox.js







const useClickOutside = (ref, callback) => {
    const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };
    react.useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    });
};
const SearchQuery = `
  query Query ($filters: [FilterInput]) {
    customers(filters: $filters) {
      items {
        customerId
        uuid
        fullName
        email
        url: editUrl
      }
    }
    products(filters: $filters) {
      items {
        productId
        uuid
        sku
        name
        url: editUrl
      }
    }
    orders(filters: $filters) {
      items {
        orderId
        uuid
        orderNumber
        url: editUrl
      }
    }
  }
`;
function SearchBox({ resourceLinks }) {
    const [keyword, setKeyword] = react.useState('');
    const [showResult, setShowResult] = (0,react.useState)(false);
    const [loading, setLoading] = (0,react.useState)(false);
    const InputRef = (0,react.useRef)(null);
    const clickRef = react.useRef(null);
    const onClickOutside = () => {
        if (InputRef.current !== document.activeElement) {
            setShowResult(false);
        }
    };
    useClickOutside(clickRef, onClickOutside);
    const [result, reexecuteQuery] = (0,urql_es/* useQuery */.IT)({
        query: SearchQuery,
        variables: {
            filters: keyword
                ? [{ key: 'keyword', operation: 'eq', value: keyword }]
                : []
        },
        pause: true
    });
    const { data, fetching } = result;
    react.useEffect(() => {
        setLoading(true);
        if (keyword) {
            setShowResult(true);
        }
        else {
            setShowResult(false);
        }
        const timer = setTimeout(() => {
            if (keyword) {
                reexecuteQuery({ requestPolicy: 'network-only' });
                setLoading(false);
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, [keyword]);
    return (react.createElement("div", { className: "relative self-center ml-[14.563rem] w-[34.375rem]" },
        react.createElement(InputGroup, { className: "bg-[#f1f2f3] rounded-[3px] border-[#f1f2f3]" },
            react.createElement(InputGroupAddon, null,
                react.createElement(search/* default */.A, null)),
            react.createElement(InputGroupInput, { type: "text", placeholder: "Search", ref: InputRef, onChange: (e) => setKeyword(e.target.value) })),
        showResult && (react.createElement("div", { className: "absolute top-[calc(100%+1rem)] left-0 bg-white rounded-[5px] w-full py-5 px-2.5 border border-border shadow-lg z-50 max-h-[30rem] overflow-y-auto", ref: clickRef },
            (loading || fetching) && (react.createElement("div", { className: "p-2 flex justify-center items-center" },
                react.createElement(admin_Spinner, { width: 25, height: 25 }))),
            !keyword && (react.createElement("div", { className: "text-center" },
                react.createElement("span", null, "Search for products, order and other resources"))),
            (data === null || data === void 0 ? void 0 : data.products.items.length) === 0 &&
                (data === null || data === void 0 ? void 0 : data.customers.items.length) === 0 &&
                (data === null || data === void 0 ? void 0 : data.orders.items.length) === 0 &&
                keyword &&
                !loading && (react.createElement(NoResult, { keyword: keyword, resourseLinks: resourceLinks })),
            data &&
                !loading &&
                !fetching &&
                ((data === null || data === void 0 ? void 0 : data.products.items.length) > 0 ||
                    (data === null || data === void 0 ? void 0 : data.customers.items.length) > 0 ||
                    (data === null || data === void 0 ? void 0 : data.orders.items.length) > 0) && (react.createElement(Results, { keyword: keyword, results: data }))))));
}
const SearchBox_layout = {
    areaId: 'header',
    sortOrder: 20
};
//# sourceMappingURL=SearchBox.js.map
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/message-square.js
var message_square = __webpack_require__(47504);
;// ./node_modules/@evershop/evershop/dist/modules/cms/pages/admin/all/Survey.js



function Survey() {
    const surveyUrl = 'https://evershop.io/admin-survey';
    const handleSurveyClick = () => {
        window.open(surveyUrl, '_blank', 'noopener,noreferrer');
    };
    return (react.createElement("div", { className: "fixed bottom-6 right-6 z-50" },
        react.createElement(Button_Button, { onClick: handleSurveyClick, size: "default", className: "shadow-lg hover:shadow-xl transition-shadow gap-2", title: "Take our survey" },
            react.createElement(message_square/* default */.A, { className: "size-4" }),
            "Give Feedback")));
}
const Survey_layout = {
    areaId: 'content',
    sortOrder: 999
};
//# sourceMappingURL=Survey.js.map
;// ./node_modules/@evershop/evershop/dist/modules/cms/pages/admin/all/Version.js


function Version({ version }) {
    return (react.createElement("div", { className: "version" },
        react.createElement("span", null,
            "Version ",
            version)));
}
Version.propTypes = {
    version: (prop_types_default()).string.isRequired
};
const Version_layout = {
    areaId: 'footerLeft',
    sortOrder: 20
};
const Version_query = (/* unused pure expression or super */ null && (`
  query query {
    version
  }
`));
//# sourceMappingURL=Version.js.map
;// ./node_modules/@evershop/evershop/dist/components/admin/FileBrowser.js






const GetApisQuery = `
  query Query ($filters: [FilterInput!]) {
    browserApi: url(routeId: "fileBrowser", params: [{key: "0", value: ""}])
    deleteApi: url(routeId: "fileDelete", params: [{key: "0", value: ""}])
    uploadApi: url(routeId: "imageUpload", params: [{key: "0", value: ""}])
    folderCreateApi: url(routeId: "folderCreate")
  }
`;
const File = ({ file, select }) => {
    const className = file.isSelected === true ? 'selected' : '';
    return (react.createElement("div", { className: `col image-item ${className}` },
        react.createElement("div", { className: "inner" },
            react.createElement("a", { href: "#", onClick: (e) => {
                    e.preventDefault();
                    select(file);
                } },
                react.createElement("img", { src: file.url, alt: "" })),
            file.isSelected === true && (react.createElement("div", { className: "select fill-current text-primary" },
                react.createElement("svg", { style: { width: '2rem' }, xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                    react.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })))))));
};
const FileBrowser = ({ onInsert, isMultiple, close }) => {
    const [error, setError] = react.useState('');
    const [loading, setLoading] = react.useState(false);
    const [folders, setFolders] = react.useState([]);
    const [files, setFiles] = react.useState([]);
    const [currentPath, setCurrentPath] = react.useState([{ name: '', index: 0 }]);
    const newFolderRefInput = react.useRef(null);
    const browserApiRef = react.useRef('');
    const deleteApiRef = react.useRef('');
    const uploadApiRef = react.useRef('');
    const folderCreateApiRef = react.useRef('');
    const onSelectFolder = (e, f) => {
        e.preventDefault();
        setCurrentPath(currentPath.concat({ name: f, index: currentPath.length + 1 }));
    };
    const onSelectFolderFromBreadcrumb = (e, index) => {
        e.preventDefault();
        const newPath = [];
        currentPath.forEach((f) => {
            if (f.index <= index)
                newPath.push(f);
        });
        setCurrentPath(newPath);
    };
    const onSelectFile = (f) => {
        if (isMultiple === false) {
            setFiles(files.map((file) => {
                if (f.name === file.name) {
                    file.isSelected = !file.isSelected;
                }
                else {
                    file.isSelected = false;
                }
                return file;
            }));
        }
        else {
            setFiles(files.map((file) => {
                if (f.name === file.name) {
                    file.isSelected = true;
                }
                else {
                    file.isSelected = false;
                }
                return file;
            }));
        }
    };
    const closeFileBrowser = (e) => {
        e.preventDefault();
        close();
    };
    const createFolder = (e, folder) => {
        e.preventDefault();
        if (!folder || !folder.trim()) {
            setError('Invalid folder name');
            return;
        }
        const path = currentPath.map((f) => f.name);
        path.push(folder.trim());
        setLoading(true);
        fetch(folderCreateApiRef.current, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ path: path.join('/') }),
            credentials: 'same-origin'
        })
            .then((res) => res.json())
            .then((response) => {
            if (!response.error) {
                // Get the first level folder, incase of recursive folder creation
                const recursiveFolders = folder.split('/');
                setFolders([...new Set(folders.concat(recursiveFolders[0]))]);
            }
            else {
                setError(response.error.message);
            }
        })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    };
    const deleteFile = () => {
        let file;
        files.forEach((f) => {
            if (f.isSelected === true) {
                file = f;
            }
        });
        if (!file) {
            setError('No file selected');
        }
        else {
            const path = currentPath.map((f) => f.name);
            path.push(file.name);
            setLoading(true);
            fetch(deleteApiRef.current + path.join('/'), {
                method: 'DELETE'
            })
                .then((res) => res.json())
                .then((response) => {
                if (!response.error) {
                    setCurrentPath(currentPath.map((f) => f));
                }
                else {
                    setError(response.error.message);
                }
            })
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false));
        }
    };
    const insertFile = () => {
        let file;
        files.forEach((f) => {
            if (f.isSelected === true) {
                file = f;
            }
        });
        if (!file) {
            setError('No file selected');
        }
        else {
            onInsert(file.url);
        }
    };
    const onUpload = (e) => {
        e.persist();
        const formData = new FormData();
        for (let i = 0; i < e.target.files.length; i += 1)
            formData.append('images', e.target.files[i]);
        const path = [];
        currentPath.forEach((f) => {
            path.push(f.name);
        });
        setLoading(true);
        fetch(uploadApiRef.current + path.join('/'), {
            method: 'POST',
            body: formData
        })
            .then((res) => res.json())
            .then((response) => {
            if (!response.error) {
                setCurrentPath(currentPath.map((f) => f));
            }
            else {
                setError(response.error.message);
            }
        })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    };
    // Create a function to fetch files and folders to avoid code duplication
    const fetchFilesAndFolders = react.useCallback(() => {
        if (!browserApiRef.current) {
            return;
        }
        const path = currentPath.map((f) => f.name);
        setLoading(true);
        fetch(browserApiRef.current + path.join('/'), {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((response) => {
            if (!response.error) {
                setFolders(response.data.folders);
                setFiles(response.data.files);
            }
            else {
                setError(response.error.message);
            }
        })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [currentPath]);
    const [result] = (0,urql_es/* useQuery */.IT)({
        query: GetApisQuery
    });
    const { data, fetching, error: err } = result;
    if (data) {
        browserApiRef.current = data.browserApi;
        deleteApiRef.current = data.deleteApi;
        uploadApiRef.current = data.uploadApi;
        folderCreateApiRef.current = data.folderCreateApi;
    }
    // Fetch files and folders when APIs are ready
    react.useEffect(() => {
        if (data) {
            fetchFilesAndFolders();
        }
    }, [currentPath, fetchFilesAndFolders, data]);
    if (err) {
        return (react.createElement("p", { className: "text-destructive" },
            "There was an error fetching file browser APIs.",
            err.message));
    }
    if (fetching) {
        return (react.createElement("div", { className: "fixed top-0 left-0 bottom-0 right-0 flex justify-center" },
            react.createElement(admin_Spinner, { width: 30, height: 30 })));
    }
    return (react.createElement("div", { className: "file-browser" },
        loading === true && (react.createElement("div", { className: "fixed top-0 left-0 bottom-0 right-0 flex justify-center" },
            react.createElement(admin_Spinner, { width: 30, height: 30 }))),
        react.createElement("div", { className: "content" },
            react.createElement("div", { className: "flex justify-end" },
                react.createElement("a", { href: "#", onClick: (e) => closeFileBrowser(e), className: "text-interactive fill-current" },
                    react.createElement("svg", { style: { width: '2rem' }, xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                        react.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" })))),
            react.createElement("div", null,
                react.createElement("div", { className: "grid grid-cols-4 gap-5" },
                    react.createElement("div", { className: "col-span-1" },
                        react.createElement("div", { className: "current-path mb-10" },
                            react.createElement("div", { className: "flex" },
                                react.createElement("div", { className: "pr-2" }, "You are here:"),
                                react.createElement("div", null,
                                    react.createElement("a", { href: "#", onClick: (e) => onSelectFolderFromBreadcrumb(e, 0), className: "text-primary hover:underline" }, "Root")),
                                currentPath
                                    .filter((f) => f.name !== '')
                                    .map((f, index) => (react.createElement("div", { key: index },
                                    react.createElement("span", null, "/"),
                                    react.createElement("a", { className: "text-primary hover:underline", href: "#", onClick: (e) => onSelectFolderFromBreadcrumb(e, f.index) }, f.name)))))),
                        react.createElement("ul", { className: "mt-4 mb-4" },
                            folders.map((f, i) => (react.createElement("li", { key: i, className: "text-primary fill-current flex list-group-item" },
                                react.createElement("svg", { style: { width: '2rem', height: '2rem' }, xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                                    react.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" })),
                                react.createElement("a", { className: "pl-2 hover:underline", href: "#", onClick: (e) => onSelectFolder(e, f) }, f)))),
                            folders.length === 0 && (react.createElement("li", { className: "list-group-item" },
                                react.createElement("span", null, "There is no sub folder.")))),
                        react.createElement("div", { className: "justify-start items-center gap-2 flex" },
                            react.createElement(Input_Input, { type: "text", placeholder: "New folder", ref: newFolderRefInput }),
                            react.createElement(Button_Button, { onClick: (e) => { var _a; return createFolder(e, (_a = newFolderRefInput.current) === null || _a === void 0 ? void 0 : _a.value); }, variant: 'outline' }, "Create"))),
                    react.createElement("div", { className: "col-span-3" },
                        react.createElement("div", { className: "error text-destructive mb-5" }, error),
                        react.createElement("div", { className: "tool-bar grid grid-cols-3 gap-2 mb-5" },
                            react.createElement(Button_Button, { variant: "destructive", title: "Delete image", onClick: () => deleteFile() }, "Delete"),
                            react.createElement(Button_Button, { variant: "default", title: "Insert image", onClick: () => insertFile() }, "Insert"),
                            react.createElement(Button_Button, { variant: "outline", onClick: () => {
                                    document.getElementById('upload-image').click();
                                } }, "Upload"),
                            react.createElement("label", { className: "self-center", id: "upload-image-label", htmlFor: "upload-image" },
                                react.createElement("a", { className: "invisible" },
                                    react.createElement("input", { id: "upload-image", type: "file", multiple: true, onChange: onUpload })))),
                        files.length === 0 && react.createElement("div", null, "There is no file to display."),
                        react.createElement("div", { className: "grid grid-cols-9 gap-2" }, files.map((f) => (react.createElement(File, { file: f, select: onSelectFile, key: f.name }))))))))));
};

//# sourceMappingURL=FileBrowser.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/form/editor/GetColumnClasses.js
const getColumnClasses = (size) => {
    switch (size) {
        case 1:
            return 'md:col-span-1';
        case 2:
            return 'md:col-span-2';
        case 3:
            return 'md:col-span-3';
        default:
            return 'md:col-span-1';
    }
};

//# sourceMappingURL=GetColumnClasses.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/form/editor/GetRowClasses.js
const getRowClasses = (size) => {
    switch (size) {
        case 1:
            return 'md:grid-cols-1';
        case 2:
            return 'md:grid-cols-2';
        case 3:
            return 'md:grid-cols-3';
        case 4:
            return 'md:grid-cols-4';
        case 5:
            return 'md:grid-cols-5';
        default:
            return 'md:grid-cols-1';
    }
};

//# sourceMappingURL=GetRowClasses.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/form/editor/RawToolWrapper.js
/**
 * Wrapper for @editorjs/raw that fixes keyboard event handling issues
 * This ensures backspace and other keys work properly in the raw HTML block
 */
class RawToolWrapper {
    constructor({ data, config, api, block }) {
        this.data = data;
        this.config = config;
        this.api = api;
        // We'll load the actual Raw tool dynamically
        this.initializeRawTool({ data, config, api, block });
    }
    async initializeRawTool(params) {
        const { default: RawTool } = await __webpack_require__.e(/* import() */ 6845).then(__webpack_require__.bind(__webpack_require__, 56845));
        this.rawTool = new RawTool(params);
    }
    static get toolbox() {
        return {
            title: 'Raw HTML',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>'
        };
    }
    render() {
        var _a;
        const wrapper = document.createElement('div');
        wrapper.classList.add('ce-rawtool');
        const textarea = document.createElement('textarea');
        textarea.classList.add('ce-rawtool__textarea');
        textarea.placeholder = 'Enter HTML code';
        textarea.value = ((_a = this.data) === null || _a === void 0 ? void 0 : _a.html) || '';
        // Prevent EditorJS from handling keyboard events inside textarea
        textarea.addEventListener('keydown', (event) => {
            event.stopPropagation();
        });
        textarea.addEventListener('keyup', (event) => {
            event.stopPropagation();
        });
        textarea.addEventListener('paste', (event) => {
            event.stopPropagation();
        });
        // Handle input changes
        textarea.addEventListener('input', () => {
            this.data = { html: textarea.value };
        });
        wrapper.appendChild(textarea);
        return wrapper;
    }
    save(blockContent) {
        const textarea = blockContent.querySelector('textarea');
        return {
            html: (textarea === null || textarea === void 0 ? void 0 : textarea.value) || ''
        };
    }
    static get sanitize() {
        return {
            html: true
        };
    }
    static get isReadOnlySupported() {
        return true;
    }
}
//# sourceMappingURL=RawToolWrapper.js.map
// EXTERNAL MODULE: ./node_modules/uuid/dist/esm-browser/v4.js + 3 modules
var v4 = __webpack_require__(33829);
;// ./node_modules/@evershop/evershop/dist/components/common/form/editor/RowTemplates.js




function RowTemplates({ addRow }) {
    const templates = {
        1: () => (react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "30", height: "30", viewBox: "0 0 48 48", "aria-hidden": "true", focusable: "false", fill: "#949494" },
            react.createElement("path", { d: "M0 10a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10Z" }))),
        '1:1': () => (react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "30", height: "30", viewBox: "0 0 48 48", "aria-hidden": "true", focusable: "false", fill: "#949494" },
            react.createElement("path", { d: "M0 10a2 2 0 0 1 2-2h19a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10Zm25 0a2 2 0 0 1 2-2h19a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H27a2 2 0 0 1-2-2V10Z" }))),
        '1:2': () => (react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "30", height: "30", viewBox: "0 0 48 48", "aria-hidden": "true", focusable: "false", fill: "#949494" },
            react.createElement("path", { d: "M0 10a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10Zm17 0a2 2 0 0 1 2-2h27a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H19a2 2 0 0 1-2-2V10Z" }))),
        '2:1': () => (react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "30", height: "30", viewBox: "0 0 48 48", "aria-hidden": "true", focusable: "false", fill: "#949494" },
            react.createElement("path", { d: "M0 10a2 2 0 0 1 2-2h27a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10Zm33 0a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H35a2 2 0 0 1-2-2V10Z" }))),
        '2:3': () => (react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "30", height: "30", viewBox: "0 0 48 48", "aria-hidden": "true", focusable: "false", fill: "#949494" },
            react.createElement("rect", { x: "0", y: "8", width: "18.4", height: "32", rx: "2", ry: "2" }),
            react.createElement("rect", { x: "21.6", y: "8", width: "24", height: "32", rx: "2", ry: "2" }))),
        '3:2': () => (react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "30", height: "30", viewBox: "0 0 48 48", "aria-hidden": "true", focusable: "false", fill: "#949494" },
            react.createElement("rect", { x: "0", y: "8", width: "24", height: "32", rx: "2", ry: "2" }),
            react.createElement("rect", { x: "27.2", y: "8", width: "18.4", height: "32", rx: "2", ry: "2" }))),
        '1:1:1': () => (react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "30", height: "30", viewBox: "0 0 48 48", "aria-hidden": "true", focusable: "false", fill: "#949494" },
            react.createElement("path", { d: "M0 10a2 2 0 0 1 2-2h10.531c1.105 0 1.969.895 1.969 2v28c0 1.105-.864 2-1.969 2H2a2 2 0 0 1-2-2V10Zm16.5 0c0-1.105.864-2 1.969-2H29.53c1.105 0 1.969.895 1.969 2v28c0 1.105-.864 2-1.969 2H18.47c-1.105 0-1.969-.895-1.969-2V10Zm17 0c0-1.105.864-2 1.969-2H46a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H35.469c-1.105 0-1.969-.895-1.969-2V10Z" }))),
        '1:2:1': () => (react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "30", height: "30", viewBox: "0 0 48 48", "aria-hidden": "true", focusable: "false", fill: "#949494" },
            react.createElement("path", { d: "M0 10a2 2 0 0 1 2-2h7.531c1.105 0 1.969.895 1.969 2v28c0 1.105-.864 2-1.969 2H2a2 2 0 0 1-2-2V10Zm13.5 0c0-1.105.864-2 1.969-2H32.53c1.105 0 1.969.895 1.969 2v28c0 1.105-.864 2-1.969 2H15.47c-1.105 0-1.969-.895-1.969-2V10Zm23 0c0-1.105.864-2 1.969-2H46a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2h-7.531c-1.105 0-1.969-.895-1.969-2V10Z" })))
    };
    return (react.createElement("div", { className: "row-templates flex justify-center gap-7 px-3" }, Object.keys(templates).map((key) => (react.createElement("a", { key: key, href: "#", onClick: (e) => {
            e.preventDefault();
            const split = key.split(':').map((val) => parseInt(val, 10));
            const sum = split.reduce((acc, val) => acc + val, 0);
            const rowClassName = getRowClasses(sum);
            const columns = split.map((size) => {
                const columnClassName = getColumnClasses(size);
                return {
                    size,
                    className: columnClassName,
                    id: `c__${(0,v4/* default */.A)()}`
                };
            });
            addRow({
                id: `r__${(0,v4/* default */.A)()}`,
                editSetting: true,
                columns,
                size: sum,
                className: rowClassName
            });
        } }, templates[key]())))));
}

//# sourceMappingURL=RowTemplates.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/ui/Label.js


function Label({ className, ...props }) {
    return (react.createElement("label", { "data-slot": "label", className: cn('gap-2 text-sm leading-none font-medium group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed', className), ...props }));
}

//# sourceMappingURL=Label.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/ui/Field.js
/* unused harmony import specifier */ var Field_Separator;
/* unused harmony import specifier */ var Field_cn;
/* unused harmony import specifier */ var Field_React;





function FieldSet({ className, ...props }) {
    return (Field_React.createElement("fieldset", { "data-slot": "field-set", className: Field_cn('gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3 flex flex-col', className), ...props }));
}
function FieldLegend({ className, variant = 'legend', ...props }) {
    return (react.createElement("legend", { "data-slot": "field-legend", "data-variant": variant, className: cn('mb-3 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base', className), ...props }));
}
function FieldGroup({ className, ...props }) {
    return (Field_React.createElement("div", { "data-slot": "field-group", className: Field_cn('gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4 group/field-group @container/field-group flex w-full flex-col', className), ...props }));
}
const fieldVariants = (0,dist/* cva */.F)('data-[invalid=true]:text-destructive gap-3 group/field flex w-full', {
    variants: {
        orientation: {
            vertical: 'flex-col [&>*]:w-full [&>.sr-only]:w-auto',
            horizontal: 'flex-row items-center [&>[data-slot=field-label]]:flex-auto has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
            responsive: 'flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto @md/field-group:[&>[data-slot=field-label]]:flex-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px'
        }
    },
    defaultVariants: {
        orientation: 'vertical'
    }
});
function Field({ className, orientation = 'vertical', ...props }) {
    return (react.createElement("div", { role: "group", "data-slot": "field", "data-orientation": orientation, className: cn(fieldVariants({ orientation }), className), ...props }));
}
function FieldContent({ className, ...props }) {
    return (Field_React.createElement("div", { "data-slot": "field-content", className: Field_cn('gap-1 group/field-content flex flex-1 flex-col leading-snug', className), ...props }));
}
function FieldLabel({ className, ...props }) {
    return (react.createElement(Label, { "data-slot": "field-label", className: cn('has-data-checked:bg-primary/5 has-data-checked:border-primary dark:has-data-checked:bg-primary/10 gap-1 group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-3 group/field-label peer/field-label flex w-fit leading-snug', 'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col', className), ...props }));
}
function FieldTitle({ className, ...props }) {
    return (Field_React.createElement("div", { "data-slot": "field-label", className: Field_cn('gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50 flex w-fit items-center leading-snug', className), ...props }));
}
function FieldDescription({ className, ...props }) {
    return (Field_React.createElement("p", { "data-slot": "field-description", className: Field_cn('text-muted-foreground text-left text-sm [[data-variant=legend]+&]:-mt-1.5 leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance', 'last:mt-0 nth-last-2:-mt-1', '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4', className), ...props }));
}
function FieldSeparator({ children, className, ...props }) {
    return (Field_React.createElement("div", { "data-slot": "field-separator", "data-content": !!children, className: Field_cn('-my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2 relative', className), ...props },
        Field_React.createElement(Field_Separator, { className: "absolute inset-0 top-1/2" }),
        children && (Field_React.createElement("span", { className: "text-muted-foreground px-2 bg-background relative mx-auto block w-fit", "data-slot": "field-separator-content" }, children))));
}
function FieldError({ className, children, errors, ...props }) {
    const content = (0,react.useMemo)(() => {
        var _a;
        if (children) {
            return children;
        }
        if (!(errors === null || errors === void 0 ? void 0 : errors.length)) {
            return null;
        }
        const uniqueErrors = [
            ...new Map(errors.map((error) => [error === null || error === void 0 ? void 0 : error.message, error])).values()
        ];
        if ((uniqueErrors === null || uniqueErrors === void 0 ? void 0 : uniqueErrors.length) == 1) {
            return (_a = uniqueErrors[0]) === null || _a === void 0 ? void 0 : _a.message;
        }
        return (react.createElement("ul", { className: "ml-4 flex list-disc flex-col gap-1" }, uniqueErrors.map((error, index) => (error === null || error === void 0 ? void 0 : error.message) && react.createElement("li", { key: index }, error.message))));
    }, [children, errors]);
    if (!content) {
        return null;
    }
    return (react.createElement("div", { role: "alert", "data-slot": "field-error", className: cn('text-destructive text-sm font-normal', className), ...props }, content));
}

//# sourceMappingURL=Field.js.map
// EXTERNAL MODULE: ./node_modules/@dnd-kit/core/dist/core.esm.js + 1 modules
var core_esm = __webpack_require__(43375);
// EXTERNAL MODULE: ./node_modules/@dnd-kit/sortable/dist/sortable.esm.js
var sortable_esm = __webpack_require__(43627);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/circle-x.js
var circle_x = __webpack_require__(50180);
// EXTERNAL MODULE: ./node_modules/react-hook-form/dist/index.esm.mjs
var index_esm = __webpack_require__(49785);
;// ./node_modules/@evershop/evershop/dist/components/common/form/Editor.js













async function loadEditorJS() {
    const { default: EditorJS } = await __webpack_require__.e(/* import() */ 9601).then(__webpack_require__.bind(__webpack_require__, 49601));
    return EditorJS;
}
async function loadEditorJSImage() {
    const { default: ImageTool } = await __webpack_require__.e(/* import() */ 7276).then(__webpack_require__.bind(__webpack_require__, 37276));
    return ImageTool;
}
async function loadEditorJSHeader() {
    const { default: Header } = await __webpack_require__.e(/* import() */ 9149).then(__webpack_require__.bind(__webpack_require__, 99149));
    return Header;
}
async function loadEditorJSList() {
    const { default: List } = await __webpack_require__.e(/* import() */ 9461).then(__webpack_require__.bind(__webpack_require__, 29461));
    return List;
}
async function loadEditorJSQuote() {
    const { default: Quote } = await __webpack_require__.e(/* import() */ 4057).then(__webpack_require__.bind(__webpack_require__, 34057));
    return Quote;
}
// Using custom RawToolWrapper instead to fix backspace issues
// async function loadEditorJSRaw(): Promise<any> {
//   const { default: RawTool } = await import('@editorjs/raw');
//   return RawTool;
// }
const SortableRow = ({ row, removeRow, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = (0,sortable_esm/* useSortable */.gl)({
        id: row.id
    });
    const style = {
        transform: transform ? `translateY(${transform.y}px)` : undefined,
        transition,
        opacity: isDragging ? 0.5 : 1,
        position: 'relative'
    };
    return (react.createElement("div", { className: "border border-border row__container mt-3 first:mt-0 rounded-md", id: row.id, ref: setNodeRef, style: style },
        react.createElement("div", { className: "config p-3 flex justify-between bg-muted items-center" },
            react.createElement("div", { className: "drag__icon cursor-move", ...attributes, ...listeners },
                react.createElement("svg", { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", fill: "#949494", width: 20, height: 20 },
                    react.createElement("g", null,
                        react.createElement("path", { fill: "none", d: "M0 0h24v24H0z" }),
                        react.createElement("path", { fillRule: "nonzero", d: "M14 6h2v2h5a1 1 0 0 1 1 1v7.5L16 13l.036 8.062 2.223-2.15L20.041 22H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zm8 11.338V21a1 1 0 0 1-.048.307l-1.96-3.394L22 17.338zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" })))),
            react.createElement("div", null,
                react.createElement("a", { href: "#", onClick: (e) => {
                        e.preventDefault();
                        removeRow(row.id);
                    } },
                    react.createElement(circle_x/* default */.A, { width: 20, height: 20 })))),
        children));
};
const Editor = ({ name, value = [], label }) => {
    const [openFileBrowser, setOpenFileBrowser] = react.useState(false);
    const [fileBrowser, setFileBrowser] = react.useState(null);
    const { register, setValue } = (0,index_esm/* useFormContext */.xW)();
    const [rows, setRows] = react.useState(value
        ? value.map((row) => {
            const rowId = `r__${(0,v4/* default */.A)()}`;
            return {
                ...row,
                className: getRowClasses(row.size),
                id: row.id || rowId,
                columns: row.columns.map((column) => {
                    const colId = `c__${(0,v4/* default */.A)()}`;
                    return {
                        ...column,
                        className: getColumnClasses(column.size),
                        id: column.id || colId
                    };
                })
            };
        })
        : []);
    const editors = react.useRef({});
    const sensors = (0,core_esm/* useSensors */.FR)((0,core_esm/* useSensor */.MS)(core_esm/* PointerSensor */.AN, {
        activationConstraint: {
            distance: 8
        }
    }), (0,core_esm/* useSensor */.MS)(core_esm/* KeyboardSensor */.uN, {
        coordinateGetter: sortable_esm/* sortableKeyboardCoordinates */.JR
    }));
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setRows((items) => {
                const oldIndex = items.findIndex((row) => row.id === active.id);
                const newIndex = items.findIndex((row) => row.id === over.id);
                if (oldIndex !== -1 && newIndex !== -1) {
                    return (0,sortable_esm/* arrayMove */.be)(items, oldIndex, newIndex);
                }
                return items;
            });
        }
    };
    react.useEffect(() => {
        const initEditors = async () => {
            const EditorJS = await loadEditorJS();
            const ImageTool = await loadEditorJSImage();
            const Header = await loadEditorJSHeader();
            const List = await loadEditorJSList();
            const Quote = await loadEditorJSQuote();
            // Using RawToolWrapper instead of loading from @editorjs/raw
            setValue(name, rows);
            rows.forEach((row) => {
                row.columns.forEach((column) => {
                    if (!editors.current[column.id]) {
                        editors.current[column.id] = {};
                        editors.current[column.id].instance = new EditorJS({
                            holder: column.id,
                            placeholder: 'Type / to see the available blocks',
                            minHeight: 0,
                            tools: {
                                header: Header,
                                list: List,
                                raw: {
                                    class: RawToolWrapper,
                                    inlineToolbar: false
                                },
                                quote: Quote,
                                image: {
                                    class: ImageTool,
                                    config: {
                                        onSelectFile: (onUpload, onError) => {
                                            setFileBrowser({
                                                onUpload: (fileUrl) => {
                                                    onUpload({
                                                        success: 1,
                                                        file: {
                                                            url: fileUrl
                                                        }
                                                    });
                                                },
                                                onError
                                            });
                                            setOpenFileBrowser(true);
                                        }
                                    }
                                }
                            },
                            data: column.data,
                            onChange: (api) => {
                                api.saver.save().then((outputData) => {
                                    // Save outputData to the column and trigger re-render
                                    setRows((prevRows) => {
                                        const newRows = [...prevRows];
                                        const rowIdx = newRows.findIndex((r) => r.id === row.id);
                                        const columnIdx = newRows[rowIdx].columns.findIndex((c) => c.id === column.id);
                                        newRows[rowIdx].columns[columnIdx].data = outputData;
                                        setValue(name, newRows);
                                        return newRows;
                                    });
                                });
                            }
                        });
                    }
                });
            });
        };
        initEditors();
    }, [rows.length]);
    const removeRow = (rowId) => {
        setRows(rows.filter((i) => i.id !== rowId));
    };
    const addRow = (row) => {
        setRows(rows.concat(row));
    };
    return (react.createElement(Field, { className: "editor form-field-container" },
        react.createElement(FieldLabel, { htmlFor: "description mt-4" }, label),
        react.createElement("div", { className: "prose prose-xl max-w-none" },
            react.createElement(core_esm/* DndContext */.Mp, { sensors: sensors, collisionDetection: core_esm/* closestCenter */.fp, onDragEnd: handleDragEnd },
                react.createElement(sortable_esm/* SortableContext */.gB, { items: rows.map((row) => row.id), strategy: sortable_esm/* verticalListSortingStrategy */._G },
                    react.createElement("div", { id: "rows" }, rows.map((row) => (
                    // Grid template columns based on the number of columns in the row
                    react.createElement(SortableRow, { key: row.id, row: row, removeRow: removeRow },
                        react.createElement("div", { className: `row grid p-5 divide-x divide-dashed ${row.className}`, style: {
                                minHeight: '30px'
                            } }, row.columns.map((column) => (react.createElement("div", { className: `column p-3 ${column.className}`, key: column.id },
                            react.createElement("div", { id: column.id }))))))))))),
            react.createElement("div", { className: "flex justify-center" },
                react.createElement("div", { className: "flex justify-center flex-col mt-5" },
                    react.createElement(RowTemplates, { addRow: addRow })))),
        react.createElement("input", { type: "hidden", ...register(name) }),
        openFileBrowser && (react.createElement(FileBrowser, { onInsert: (url) => {
                fileBrowser && fileBrowser.onUpload(url);
                setOpenFileBrowser(false);
            }, close: () => setOpenFileBrowser(false), isMultiple: false }))));
};
//# sourceMappingURL=Editor.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/form/Tooltip.js

function Tooltip({ content, position = 'top', className = '' }) {
    const [isVisible, setIsVisible] = (0,react.useState)(false);
    const positionClasses = {
        top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
    };
    const arrowClasses = {
        top: 'top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800',
        bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-800',
        left: 'left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-gray-800',
        right: 'right-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-gray-800'
    };
    return (react.createElement("div", { className: `relative inline-flex ${className}` },
        react.createElement("button", { type: "button", className: "inline-flex items-center justify-center w-4 h-4 ml-1 text-gray-400 hover:text-gray-600 transition-colors duration-200", onMouseEnter: () => setIsVisible(true), onMouseLeave: () => setIsVisible(false), onFocus: () => setIsVisible(true), onBlur: () => setIsVisible(false), tabIndex: -1 },
            react.createElement("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 20 20" },
                react.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z", clipRule: "evenodd" }))),
        isVisible && (react.createElement("div", { className: `absolute z-50 px-3 py-2 text-sm font-normal text-white bg-gray-800 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform ${positionClasses[position]} opacity-100 scale-100`, style: { minWidth: '200px', maxWidth: '300px' } },
            content,
            react.createElement("div", { className: `absolute w-0 h-0 ${arrowClasses[position]}` })))));
}
//# sourceMappingURL=Tooltip.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/form/utils/getNestedError.js
/**
 * Helper function to get nested error from react-hook-form errors object
 * Handles both simple field names and nested array field names using dot notation (e.g., "attributes.0.value")
 * Also supports legacy bracket notation for backward compatibility
 */
const getNestedError = (name, errors, error) => {
    var _a;
    if (error)
        return error;
    if (!name.includes('.') && !name.includes('[')) {
        return (_a = errors[name]) === null || _a === void 0 ? void 0 : _a.message;
    }
    let parts;
    if (name.includes('[')) {
        parts = name.split(/[\[\]]+/).filter(Boolean);
    }
    else {
        parts = name.split('.');
    }
    let current = errors;
    for (const part of parts) {
        if (current === null || current === undefined)
            return undefined;
        const index = parseInt(part);
        if (!isNaN(index)) {
            current = current[index];
        }
        else {
            current = current[part];
        }
    }
    return current === null || current === void 0 ? void 0 : current.message;
};
//# sourceMappingURL=getNestedError.js.map
;// ./node_modules/@evershop/evershop/dist/lib/locale/translate/_.js
function _(text, values) {
    // Check if the data is null, undefined or empty object
    if (!values || Object.keys(values).length === 0) {
        return text;
    }
    const template = `${text}`;
    return template.replace(/\${(.*?)}/g, (match, key) => values[key.trim()] !== undefined ? values[key.trim()] : match);
}
//# sourceMappingURL=_.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/form/InputField.js







function InputField({ name, label, error, helperText, required, validation, wrapperClassName, className, type = 'text', prefixIcon, suffixIcon, defaultValue, ...props }) {
    const { control, formState: { errors } } = (0,index_esm/* useFormContext */.xW)();
    const fieldError = getNestedError(name, errors, error);
    const fieldId = `field-${name}`;
    const validationRules = {
        ...validation,
        ...(required &&
            !(validation === null || validation === void 0 ? void 0 : validation.required) && {
            required: _('${field} is required', { field: label || name })
        })
    };
    const renderInput = () => (react.createElement(index_esm/* Controller */.xI, { name: name, control: control, defaultValue: (defaultValue !== null && defaultValue !== void 0 ? defaultValue : ''), rules: validationRules, render: ({ field }) => (react.createElement(InputGroupInput, { ...field, id: fieldId, type: type, "aria-invalid": fieldError !== undefined ? 'true' : 'false', "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : undefined, ...props })) }));
    // Special case: hidden inputs don't need labels or error messages
    if (type === 'hidden') {
        return (react.createElement("div", null,
            renderInput(),
            fieldError && react.createElement(FieldError, null, fieldError)));
    }
    return (react.createElement(Field, { "data-invalid": fieldError ? 'true' : 'false', className: wrapperClassName },
        label && (react.createElement(FieldLabel, { htmlFor: fieldId },
            react.createElement(react.Fragment, null,
                label,
                required && react.createElement("span", { className: "text-destructive" }, "*"),
                helperText && react.createElement(Tooltip, { content: helperText, position: "top" })))),
        react.createElement(InputGroup, null,
            renderInput(),
            prefixIcon && (react.createElement(InputGroupAddon, { align: 'inline-start' }, prefixIcon)),
            suffixIcon && (react.createElement(InputGroupAddon, { align: 'inline-end' }, suffixIcon))),
        fieldError && react.createElement(FieldError, null, fieldError)));
}
//# sourceMappingURL=InputField.js.map
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/radio/root/RadioRoot.js
var RadioRoot = __webpack_require__(28284);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/radio/indicator/RadioIndicator.js
var RadioIndicator = __webpack_require__(99806);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/radio-group/RadioGroup.js
var RadioGroup = __webpack_require__(98716);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/circle.js
var circle = __webpack_require__(68309);
;// ./node_modules/@evershop/evershop/dist/components/common/ui/RadioGroup.js





function RadioGroup_RadioGroup({ className, ...props }) {
    return (react.createElement(RadioGroup/* RadioGroup */.z, { "data-slot": "radio-group", className: cn('grid gap-3 w-full', className), ...props }));
}
function RadioGroupItem({ className, ...props }) {
    return (react.createElement(RadioRoot/* RadioRoot */.U, { "data-slot": "radio-group-item", className: cn('border-input text-primary dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 flex size-4 rounded-full shadow-xs focus-visible:ring-[3px] aria-invalid:ring-[3px] group/radio-group-item peer relative aspect-square shrink-0 border outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50', className), ...props },
        react.createElement(RadioIndicator/* RadioIndicator */.T, { "data-slot": "radio-group-indicator", className: "group-aria-invalid/radio-group-item:text-destructive text-primary flex size-4 items-center justify-center" },
            react.createElement(circle/* default */.A, { className: "absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-current" }))));
}

//# sourceMappingURL=RadioGroup.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/form/RadioGroupField.js







function RadioGroupField({ name, options, label, error, wrapperClassName, helperText, className = '', required = false, disabled = false, validation, defaultValue, ...props }) {
    const { control, formState: { errors } } = (0,index_esm/* useFormContext */.xW)();
    const fieldError = getNestedError(name, errors, error);
    const fieldId = `field-${name}`;
    const validationRules = {
        ...validation,
        ...(required &&
            !(validation === null || validation === void 0 ? void 0 : validation.required) && {
            required: _('${field} is required', { field: label || name })
        })
    };
    return (react.createElement(Field, { "data-invalid": fieldError ? 'true' : 'false', className: wrapperClassName },
        label && (react.createElement(FieldLabel, null,
            react.createElement(react.Fragment, null,
                label,
                required && react.createElement("span", { className: "text-destructive" }, "*"),
                helperText && react.createElement(Tooltip, { content: helperText, position: "top" })))),
        react.createElement(index_esm/* Controller */.xI, { name: name, control: control, rules: validationRules, defaultValue: defaultValue, render: ({ field }) => {
                var _a;
                return (react.createElement(RadioGroup_RadioGroup, { value: String((_a = field.value) !== null && _a !== void 0 ? _a : ''), onValueChange: (value) => {
                        const option = options.find((o) => String(o.value) === value);
                        if (option) {
                            field.onChange(option.value);
                        }
                    }, className: className, "aria-invalid": fieldError !== undefined ? 'true' : 'false', "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : undefined }, options.map((option) => (react.createElement("div", { key: option.value, className: "flex items-center gap-2" },
                    react.createElement(RadioGroupItem, { value: String(option.value), id: `${fieldId}-${option.value}`, disabled: disabled || option.disabled }),
                    react.createElement(FieldLabel, { htmlFor: `${fieldId}-${option.value}`, className: `text-sm font-normal cursor-pointer ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}` }, option.label))))));
            } }),
        fieldError && react.createElement(FieldError, null, fieldError)));
}
//# sourceMappingURL=RadioGroupField.js.map
;// ./node_modules/@evershop/evershop/dist/modules/cms/pages/admin/cmsPageEdit+cmsPageNew/General.js





function General({ page }) {
    return (react.createElement(Card, null,
        react.createElement(CardHeader, null,
            react.createElement(CardTitle, null, "General Information"),
            react.createElement(CardDescription, null, "Provide the basic information for the CMS page.")),
        react.createElement(CardContent, null,
            react.createElement("div", { className: "space-y-3" },
                react.createElement("div", null,
                    react.createElement(InputField, { id: "cms_page_name", name: "name", label: "Page Name", placeholder: "Enter page name", defaultValue: page === null || page === void 0 ? void 0 : page.name, required: true, validation: { required: 'Page name is required' }, helperText: "This is the name of the CMS page that will be displayed in the admin panel." })),
                react.createElement("div", { className: "space-y-2" },
                    react.createElement(RadioGroupField, { name: "status", label: "Status", options: [
                            { value: 1, label: 'Enabled' },
                            { value: 0, label: 'Disabled' }
                        ], defaultValue: page === null || page === void 0 ? void 0 : page.status, required: true, helperText: "Enable this page to make it visible on the frontend." })),
                react.createElement("div", null,
                    react.createElement("label", { htmlFor: "content", className: "block mb-2 font-medium" }, "Content"),
                    react.createElement(Editor, { name: "content", value: (page === null || page === void 0 ? void 0 : page.content) || [] }))))));
}
const General_layout = {
    areaId: 'wideScreen',
    sortOrder: 10
};
const General_query = (/* unused pure expression or super */ null && (`
  query Query {
    page: cmsPage(id: getContextValue("cmsPageId", null)) {
      cmsPageId
      name
      status
      sortOrder
      content
    }
  }
`));
//# sourceMappingURL=General.js.map
;// ./node_modules/@evershop/evershop/dist/components/admin/PageHeading.js



function BackIcon({ backUrl }) {
    if (!backUrl)
        return null;
    return (react.createElement("a", { href: backUrl, className: "breadcrum-icon border block border-border rounded mr-2" },
        react.createElement("span", { className: "flex items-center justify-center" },
            react.createElement("svg", { className: "text-icon", viewBox: "0 0 20 20", focusable: "false", "aria-hidden": "true" },
                react.createElement("path", { d: "M17 9H5.414l3.293-3.293a.999.999 0 1 0-1.414-1.414l-5 5a.999.999 0 0 0 0 1.414l5 5a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L5.414 11H17a1 1 0 1 0 0-2z" })))));
}
BackIcon.defaultProps = {
    backUrl: undefined
};
function Heading({ heading }) {
    return (react.createElement("div", { className: "self-center" },
        react.createElement("h1", { className: "page-heading-title" }, heading)));
}
function PageHeading({ backUrl, heading }) {
    if (!heading) {
        return null;
    }
    return (react.createElement("div", { className: "page-heading flex justify-between items-center" },
        react.createElement("div", { className: "flex justify-start space-x-2 items-center" },
            react.createElement(common_Area, { id: "pageHeadingLeft", noOuter: true, coreComponents: [
                    {
                        component: { default: BackIcon },
                        props: {
                            backUrl
                        },
                        sortOrder: 0,
                        id: 'breadcrumb'
                    },
                    {
                        component: { default: Heading },
                        props: {
                            heading
                        },
                        sortOrder: 0,
                        id: 'heading'
                    }
                ] })),
        react.createElement("div", { className: "flex justify-end space-x-2 items-center" },
            react.createElement(common_Area, { id: "pageHeadingRight", noOuter: true, coreComponents: [] }))));
}
PageHeading.defaultProps = {
    backUrl: undefined
};

//# sourceMappingURL=PageHeading.js.map
;// ./node_modules/@evershop/evershop/dist/modules/cms/pages/admin/cmsPageEdit+cmsPageNew/PageHeading.js


function CmsGridPageHeading({ backUrl, page }) {
    return (react.createElement("div", { className: "w-2/3 mx-auto" },
        react.createElement(PageHeading, { backUrl: backUrl, heading: page ? `Editing ${page.name}` : 'Create a new page' })));
}
CmsGridPageHeading.defaultProps = {
    page: null
};
const PageHeading_layout = {
    areaId: 'content',
    sortOrder: 5
};
const PageHeading_query = (/* unused pure expression or super */ null && (`
  query Query {
    page: cmsPage(id: getContextValue("cmsPageId", null)) {
      name
    }
    backUrl: url(routeId: "cmsPageGrid")
  }
`));
//# sourceMappingURL=PageHeading.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/form/TextareaField.js







function TextareaField({ name, label, error, helperText, wrapperClassName, required, validation, className, rows = 4, defaultValue, ...props }) {
    const { control, formState: { errors } } = (0,index_esm/* useFormContext */.xW)();
    const fieldError = getNestedError(name, errors, error);
    const fieldId = `field-${name}`;
    const validationRules = {
        ...validation,
        ...(required &&
            !(validation === null || validation === void 0 ? void 0 : validation.required) && {
            required: _('${field} is required', { field: label || name })
        })
    };
    return (react.createElement(Field, { "data-invalid": fieldError ? 'true' : 'false', className: wrapperClassName },
        label && (react.createElement(FieldLabel, { htmlFor: fieldId },
            react.createElement(react.Fragment, null,
                label,
                required && react.createElement("span", { className: "text-destructive" }, "*"),
                helperText && react.createElement(Tooltip, { content: helperText, position: "top" })))),
        react.createElement(index_esm/* Controller */.xI, { name: name, control: control, rules: validationRules, defaultValue: defaultValue, render: ({ field }) => (react.createElement(Textarea, { ...field, id: fieldId, rows: rows, className: `${fieldError !== undefined ? 'error' : ''} ${className || ''}`, "aria-invalid": fieldError !== undefined ? 'true' : 'false', "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : undefined, ...props })) }),
        fieldError && react.createElement(FieldError, null, fieldError)));
}
//# sourceMappingURL=TextareaField.js.map
;// ./node_modules/@evershop/evershop/dist/modules/cms/pages/admin/cmsPageEdit+cmsPageNew/Seo.js




function Seo({ page }) {
    return (react.createElement(Card, null,
        react.createElement(CardHeader, null,
            react.createElement(CardTitle, null, "SEO Information"),
            react.createElement(CardDescription, null, "Provide the SEO details for the CMS page.")),
        react.createElement(CardContent, null,
            react.createElement("div", { className: "space-y-3" },
                react.createElement(InputField, { id: "urlKey", name: "url_key", label: "URL Key", placeholder: "Enter URL key", defaultValue: page === null || page === void 0 ? void 0 : page.urlKey, required: true, validation: { required: 'URL key is required' }, helperText: "This is the URL path for the CMS page." }),
                react.createElement(InputField, { id: "metaTitle", name: "meta_title", label: "Meta Title", placeholder: "Enter meta title", defaultValue: page === null || page === void 0 ? void 0 : page.metaTitle, required: true, validation: { required: 'Meta title is required' }, helperText: "This is the meta title for the CMS page." }),
                react.createElement(TextareaField, { name: "meta_description", label: "Meta Description", placeholder: "Enter meta description", defaultValue: page === null || page === void 0 ? void 0 : page.metaDescription })))));
}
const Seo_layout = {
    areaId: 'wideScreen',
    sortOrder: 30
};
const Seo_query = (/* unused pure expression or super */ null && (`
  query Query {
    page: cmsPage(id: getContextValue('cmsPageId', null)) {
      urlKey
      metaTitle
      metaKeywords
      metaDescription
    }
  }
`));
//# sourceMappingURL=Seo.js.map
;// ./node_modules/@evershop/evershop/dist/components/admin/FormButtons.js



const FormButtons = ({ cancelUrl, formId }) => {
    const { formState: { isSubmitting } } = (0,index_esm/* useFormContext */.xW)();
    return (react.createElement("div", { className: "form-submit-button flex border-t border-border mt-4 pt-4 justify-between" },
        react.createElement(Button_Button, { variant: "destructive", onClick: () => {
                window.location.href = cancelUrl;
            } }, "Cancel"),
        react.createElement(Button_Button, { onClick: () => {
                document.getElementById(formId).dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
            }, isLoading: isSubmitting }, "Save")));
};

//# sourceMappingURL=FormButtons.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/form/Form.js





function Form({ form: externalForm, action, method = 'POST', formOptions, onSubmit, onSuccess, onError, successMessage = _('Saved successfully!'), errorMessage = _('Something went wrong! Please try again.'), submitBtn = true, submitBtnText = _('Save'), loading = false, children, className, noValidate = true, ...props }) {
    const theForm = externalForm ||
        (0,index_esm/* useForm */.mN)({
            shouldUnregister: true,
            shouldFocusError: false,
            ...formOptions
        });
    const { handleSubmit, formState: { isSubmitting } } = theForm;
    const defaultSubmit = async (data) => {
        if (!action) {
            return;
        }
        try {
            const response = await fetch(action, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.error) {
                if (onError) {
                    onError(result.error.message, data);
                }
                else {
                    react_toastify_esm/* toast */.oR.error(result.error.message || errorMessage);
                }
            }
            else if (onSuccess) {
                onSuccess(result, data);
            }
            else {
                react_toastify_esm/* toast */.oR.success(successMessage);
            }
        }
        catch (error) {
            if (onError) {
                onError(errorMessage || (error instanceof Error ? error.message : ''), data);
            }
            else {
                react_toastify_esm/* toast */.oR.error(errorMessage || (error instanceof Error ? error.message : ''));
            }
        }
    };
    const [canFocus, setCanFocus] = (0,react.useState)(true);
    const onValidationError = () => {
        setCanFocus(true);
    };
    (0,react.useEffect)(() => {
        if (theForm.formState.errors && canFocus) {
            const elements = Array.from(document.querySelectorAll('[aria-invalid="true"]'));
            elements.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
            if (elements.length > 0) {
                const errorElement = elements[0];
                errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                errorElement.focus({ preventScroll: true });
                setCanFocus(false);
            }
        }
    }, [theForm.formState, canFocus]);
    const handleFormSubmit = onSubmit || defaultSubmit;
    return (react.createElement(index_esm/* FormProvider */.Op, { ...theForm },
        react.createElement("form", { onSubmit: handleSubmit(handleFormSubmit, onValidationError), className: className, noValidate: noValidate, ...props },
            react.createElement("fieldset", { disabled: loading }, children),
            submitBtn && (react.createElement("div", { className: "mt-4" },
                react.createElement(Button_Button, { title: submitBtnText, type: "submit", onClick: () => {
                        handleSubmit(handleFormSubmit, onValidationError)();
                    }, isLoading: isSubmitting || loading }, submitBtnText))))));
}


//# sourceMappingURL=Form.js.map
;// ./node_modules/@evershop/evershop/dist/modules/cms/pages/admin/cmsPageNew/PageNewForm.js





function CmsPageNewForm({ action, gridUrl }) {
    return (react.createElement(Form, { action: action, method: "POST", onSuccess: (response) => {
            react_toastify_esm/* toast */.oR.success('Page created successfully!');
            setTimeout(() => {
                const editUrl = response.data.links.find((link) => link.rel === 'edit').href;
                window.location.href = editUrl;
            }, 1500);
        }, id: "cmsPageNewForm", submitBtn: false },
        react.createElement("div", { className: "grid gap-5 grid-cols-1 w-2/3 mx-auto" },
            react.createElement(common_Area, { id: "wideScreen", noOuter: true })),
        react.createElement(FormButtons, { formId: "cmsPageNewForm", cancelUrl: gridUrl })));
}
const PageNewForm_layout = {
    areaId: 'content',
    sortOrder: 10
};
const PageNewForm_query = (/* unused pure expression or super */ null && (`
  query Query {
    action: url(routeId: "createCmsPage")
    gridUrl: url(routeId: "cmsPageGrid")
  }
`));
//# sourceMappingURL=PageNewForm.js.map
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/user.js
var user = __webpack_require__(48686);
;// ./node_modules/@evershop/evershop/dist/modules/customer/pages/admin/all/CustomerMenuGroup.js




function CustomerMenuGroup({ customerGrid }) {
    return (react.createElement(NavigationItemGroup, { id: "customerMenuGroup", name: "Customer", items: [
            {
                Icon: user/* default */.A,
                url: customerGrid,
                title: 'Customers'
            }
        ] }));
}
CustomerMenuGroup.propTypes = {
    customerGrid: (prop_types_default()).string.isRequired
};
const CustomerMenuGroup_layout = {
    areaId: 'adminMenu',
    sortOrder: 40
};
const CustomerMenuGroup_query = (/* unused pure expression or super */ null && (`
  query Query {
    customerGrid: url(routeId:"customerGrid")
  }
`));
//# sourceMappingURL=CustomerMenuGroup.js.map
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/package.js
var icons_package = __webpack_require__(17133);
;// ./node_modules/@evershop/evershop/dist/modules/oms/pages/admin/all/OmsMenuGroup.js




function OmsMenuGroup({ orderGrid }) {
    return (react.createElement(NavigationItemGroup, { id: "omsMenuGroup", name: "Sale", items: [
            {
                Icon: icons_package/* default */.A,
                url: orderGrid,
                title: 'Orders'
            }
        ] }));
}
OmsMenuGroup.propTypes = {
    orderGrid: (prop_types_default()).string.isRequired
};
const OmsMenuGroup_layout = {
    areaId: 'adminMenu',
    sortOrder: 30
};
const OmsMenuGroup_query = (/* unused pure expression or super */ null && (`
  query Query {
    orderGrid: url(routeId:"orderGrid")
  }
`));
//# sourceMappingURL=OmsMenuGroup.js.map
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/gift.js
var gift = __webpack_require__(21767);
;// ./node_modules/@evershop/evershop/dist/modules/promotion/pages/admin/all/CouponMenuGroup.js



function CouponMenuGroup_CatalogMenuGroup({ couponGrid }) {
    return (react.createElement(NavigationItemGroup, { id: "couponMenuGroup", name: "Promotion", items: [
            {
                Icon: gift/* default */.A,
                url: couponGrid,
                title: 'Coupons'
            }
        ] }));
}
const CouponMenuGroup_layout = {
    areaId: 'adminMenu',
    sortOrder: 50
};
const CouponMenuGroup_query = (/* unused pure expression or super */ null && (`
  query Query {
    couponGrid: url(routeId:"couponGrid")
  }
`));
//# sourceMappingURL=CouponMenuGroup.js.map
;// ./node_modules/@evershop/evershop/dist/modules/promotion/pages/admin/all/NewCouponQuickLink.js



function NewCouponQuickLink_NewProductQuickLink({ couponNew }) {
    return react.createElement(NavigationItem, { Icon: gift/* default */.A, title: "New Coupon", url: couponNew });
}
const NewCouponQuickLink_layout = {
    areaId: 'quickLinks',
    sortOrder: 30
};
const NewCouponQuickLink_query = (/* unused pure expression or super */ null && (`
  query Query {
    couponNew: url(routeId:"couponNew")
  }
`));
//# sourceMappingURL=NewCouponQuickLink.js.map
;// ./node_modules/@evershop/evershop/dist/modules/setting/pages/admin/all/PaymentSettingMenu.js





function PaymentSettingMenu({ paymentSettingUrl }) {
    const isActive = typeof window !== 'undefined' &&
        new URL(paymentSettingUrl, window.location.origin).pathname ===
            window.location.pathname;
    return (react.createElement(Item, { variant: 'outline', className: cn(isActive && 'bg-primary/5 border-primary/20 dark:bg-primary/10'), "data-active": isActive ? 'true' : 'false' },
        react.createElement(ItemContent, null,
            react.createElement(ItemTitle, null,
                react.createElement("div", null,
                    react.createElement("a", { href: paymentSettingUrl, className: cn('uppercase text-xs font-semibold', isActive && 'text-primary') }, "Payment Setting"))),
            react.createElement(ItemDescription, null,
                react.createElement("div", null, "Configure the available payment methods"))),
        react.createElement(ItemActions, null,
            react.createElement(Button_Button, { variant: "outline", size: "sm", onClick: () => (window.location.href = paymentSettingUrl) },
                react.createElement(settings/* default */.A, { className: "h-4 w-4 mr-1" })))));
}
const PaymentSettingMenu_layout = {
    areaId: 'settingPageMenu',
    sortOrder: 10
};
const PaymentSettingMenu_query = (/* unused pure expression or super */ null && (`
  query Query {
    paymentSettingUrl: url(routeId: "paymentSetting")
  }
`));
//# sourceMappingURL=PaymentSettingMenu.js.map
;// ./node_modules/@evershop/evershop/dist/modules/setting/pages/admin/all/SettingMenuGroup.js



function SettingMenuGroup_CmsMenuGroup({ storeSetting }) {
    return (react.createElement(NavigationItemGroup, { id: "settingMenuGroup", name: "Setting", Icon: () => react.createElement(settings/* default */.A, { width: 15, height: 15 }), url: storeSetting }));
}
const SettingMenuGroup_layout = {
    areaId: 'adminMenu',
    sortOrder: 500
};
const SettingMenuGroup_query = (/* unused pure expression or super */ null && (`
  query Query {
    storeSetting: url(routeId:"storeSetting")
  }
`));
//# sourceMappingURL=SettingMenuGroup.js.map
;// ./node_modules/@evershop/evershop/dist/modules/setting/pages/admin/all/StoreSettingMenu.js





function StoreSettingMenu({ storeSettingUrl }) {
    const isActive = typeof window !== 'undefined' &&
        new URL(storeSettingUrl, window.location.origin).pathname ===
            window.location.pathname;
    return (react.createElement(Item, { variant: 'outline', className: cn(isActive && 'bg-primary/5 border-primary/20 dark:bg-primary/10'), "data-active": isActive ? 'true' : 'false' },
        react.createElement(ItemContent, null,
            react.createElement(ItemTitle, null,
                react.createElement("div", null,
                    react.createElement("a", { href: storeSettingUrl, className: cn('uppercase text-xs font-semibold', isActive && 'text-primary') }, "Store Setting"))),
            react.createElement(ItemDescription, null,
                react.createElement("div", null, "Configure your store information"))),
        react.createElement(ItemActions, null,
            react.createElement(Button_Button, { variant: "outline", size: "sm", onClick: () => (window.location.href = storeSettingUrl) },
                react.createElement(settings/* default */.A, { className: "h-4 w-4 mr-1" })))));
}
const StoreSettingMenu_layout = {
    areaId: 'settingPageMenu',
    sortOrder: 5
};
const StoreSettingMenu_query = (/* unused pure expression or super */ null && (`
  query Query {
    storeSettingUrl: url(routeId: "storeSetting")
  }
`));
//# sourceMappingURL=StoreSettingMenu.js.map
;// ./node_modules/@evershop/evershop/dist/modules/tax/pages/admin/all/TaxSettingMenu.js





function TaxSettingMenu({ taxSettingUrl }) {
    const isActive = typeof window !== 'undefined' &&
        new URL(taxSettingUrl, window.location.origin).pathname ===
            window.location.pathname;
    return (react.createElement(Item, { variant: 'outline', className: cn(isActive && 'bg-primary/5 border-primary/20 dark:bg-primary/10'), "data-active": isActive ? 'true' : 'false' },
        react.createElement(ItemContent, null,
            react.createElement(ItemTitle, null,
                react.createElement("div", null,
                    react.createElement("a", { href: taxSettingUrl, className: cn('uppercase text-xs font-semibold', isActive && 'text-primary') }, "Tax Setting"))),
            react.createElement(ItemDescription, null,
                react.createElement("div", null, "Configure tax classes and tax rates"))),
        react.createElement(ItemActions, null,
            react.createElement(Button_Button, { variant: "outline", size: "sm", onClick: () => (window.location.href = taxSettingUrl) },
                react.createElement(settings/* default */.A, { className: "h-4 w-4 mr-1" })))));
}
const TaxSettingMenu_layout = {
    areaId: 'settingPageMenu',
    sortOrder: 20
};
const TaxSettingMenu_query = (/* unused pure expression or super */ null && (`
  query Query {
    taxSettingUrl: url(routeId: "taxSetting")
  }
`));
//# sourceMappingURL=TaxSettingMenu.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/form/NumberField.js







function NumberField({ name, label, placeholder, className = '', wrapperClassName, required = false, disabled = false, min, max, step, allowDecimals = true, unit, unitPosition = 'right', defaultValue, error, helperText, validation, onChange, prefixIcon, suffixIcon, ...props }) {
    const { control, formState: { errors } } = (0,index_esm/* useFormContext */.xW)();
    const fieldError = getNestedError(name, errors, error);
    const fieldId = `field-${name}`;
    const validationRules = {
        setValueAs: (value) => {
            // Handle empty or null values
            if (value === '' || value === null || value === undefined) {
                return null;
            }
            // Convert string to number
            const numValue = allowDecimals ? parseFloat(value) : parseInt(value, 10);
            // Return null if conversion resulted in NaN
            return isNaN(numValue) ? null : numValue;
        }
    };
    if (validation) {
        Object.assign(validationRules, validation);
    }
    if (required && !validationRules.required) {
        validationRules.required = _('${field} is required', {
            field: label || 'This field'
        });
    }
    if (min !== undefined && !validationRules.min) {
        validationRules.min = {
            value: min,
            message: _('Value must be at least ${min}', { min: min.toString() })
        };
    }
    if (max !== undefined && !validationRules.max) {
        validationRules.max = {
            value: max,
            message: _('Value must be at most ${max}', { max: max.toString() })
        };
    }
    if (!allowDecimals && !(validation === null || validation === void 0 ? void 0 : validation.validate)) {
        validationRules.validate = (value) => {
            if (value === null || value === undefined || value === '')
                return true;
            return (Number.isInteger(Number(value)) || _('Value must be a whole number'));
        };
    }
    else if (!allowDecimals &&
        (validation === null || validation === void 0 ? void 0 : validation.validate) &&
        typeof validation.validate === 'object') {
        validationRules.validate = {
            ...validation.validate,
            isInteger: (value) => {
                if (value === null || value === undefined || value === '')
                    return true;
                return (Number.isInteger(Number(value)) || _('Value must be a whole number'));
            }
        };
    }
    const inputStep = step !== undefined ? step : allowDecimals ? 'any' : '1';
    const inputClassName = `${fieldError ? 'error' : ''} ${unit ? 'has-unit' : ''} ${className || ''} ${prefixIcon ? '!pl-10' : ''} ${suffixIcon ? '!pr-10' : ''}`.trim();
    const renderInput = () => (react.createElement(index_esm/* Controller */.xI, { name: name, control: control, defaultValue: defaultValue !== null && defaultValue !== void 0 ? defaultValue : null, rules: validationRules, render: ({ field }) => {
            var _a;
            return (react.createElement(InputGroupInput, { ...field, id: fieldId, type: "number", placeholder: placeholder, disabled: disabled, min: min, max: max, step: inputStep, className: inputClassName, "aria-invalid": fieldError ? 'true' : 'false', "aria-describedby": fieldError ? `${fieldId}-error` : undefined, value: (_a = field.value) !== null && _a !== void 0 ? _a : '', onChange: (e) => {
                    const inputValue = e.target.value;
                    let numValue = null;
                    if (inputValue !== '') {
                        if (allowDecimals) {
                            numValue = parseFloat(inputValue);
                        }
                        else {
                            numValue = parseInt(inputValue, 10);
                        }
                        numValue = isNaN(numValue) ? null : numValue;
                    }
                    field.onChange(numValue);
                    if (onChange) {
                        onChange(numValue);
                    }
                }, ...props }));
        } }));
    return (react.createElement(Field, { "data-invalid": fieldError ? 'true' : 'false', className: wrapperClassName },
        label && (react.createElement(FieldLabel, { htmlFor: fieldId },
            react.createElement(react.Fragment, null,
                label,
                required && react.createElement("span", { className: "text-destructive" }, "*"),
                helperText && react.createElement(Tooltip, { content: helperText, position: "top" })))),
        react.createElement(InputGroup, null,
            renderInput(),
            prefixIcon && (react.createElement(InputGroupAddon, { align: 'inline-start' }, prefixIcon)),
            suffixIcon && (react.createElement(InputGroupAddon, { align: 'inline-end' }, suffixIcon)),
            unit && (react.createElement(InputGroupAddon, { align: unitPosition === 'right' ? 'inline-end' : 'inline-start' }, unit))),
        fieldError && react.createElement(FieldError, null, fieldError)));
}
//# sourceMappingURL=NumberField.js.map
;// ./node_modules/@evershop/evershop/dist/modules/catalog/components/CollectionProductsSetting.js










const CollectionProductsSetting_SearchQuery = `
  query Query ($filters: [FilterInput!]) {
    collections(filters: $filters) {
      items {
        collectionId
        uuid
        code
        name
      }
      total
    }
  }
`;
function CollectionProductsSetting({ collectionProductsWidget: { collection, count, countPerRow } }) {
    const limit = 10;
    const [inputValue, setInputValue] = react.useState(null);
    const [selectedCollection, setSelectedCollection] = react.useState(collection);
    const [page, setPage] = react.useState(1);
    const { register, setValue } = (0,index_esm/* useFormContext */.xW)();
    const [result, reexecuteQuery] = (0,urql_es/* useQuery */.IT)({
        query: CollectionProductsSetting_SearchQuery,
        variables: {
            filters: inputValue
                ? [
                    { key: 'name', operation: 'like', value: inputValue },
                    { key: 'page', operation: 'eq', value: page.toString() },
                    { key: 'limit', operation: 'eq', value: limit.toString() }
                ]
                : [
                    { key: 'limit', operation: 'eq', value: limit.toString() },
                    { key: 'page', operation: 'eq', value: page.toString() }
                ]
        },
        pause: true
    });
    react.useEffect(() => {
        reexecuteQuery({ requestPolicy: 'network-only' });
    }, []);
    react.useEffect(() => {
        const timer = setTimeout(() => {
            if (inputValue !== null) {
                reexecuteQuery({ requestPolicy: 'network-only' });
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, [inputValue]);
    react.useEffect(() => {
        reexecuteQuery({ requestPolicy: 'network-only' });
    }, [page]);
    const { data, fetching, error } = result;
    if (error) {
        return (react.createElement("p", { className: "text-destructive" },
            "There was an error fetching collections.",
            error.message));
    }
    return (react.createElement("div", null,
        react.createElement("div", null,
            react.createElement("div", { className: "mb-3" },
                react.createElement(Input_Input, { type: "text", value: inputValue || '', placeholder: "Search collections", onChange: (e) => setInputValue(e.target.value) })),
            fetching && (react.createElement(Item, { variant: 'outline' },
                react.createElement(ItemContent, null,
                    react.createElement(admin_Spinner, { width: 25, height: 25 })))),
            !fetching && data && (react.createElement("div", null,
                data.collections.items.length === 0 && (react.createElement("div", { className: "p-2 border border-divider rounded flex justify-center items-center" }, inputValue ? (react.createElement("p", null,
                    "No collections found for query \"",
                    inputValue,
                    "\u201D")) : (react.createElement("p", null, "You have no collections to display")))),
                react.createElement(RadioGroup_RadioGroup, { defaultValue: selectedCollection, onValueChange: (value) => {
                        setSelectedCollection(value);
                        setValue('settings[collection]', value, {
                            shouldDirty: true
                        });
                    } },
                    react.createElement("div", { className: "divide-y mb-2" }, data.collections.items.map((collection) => (react.createElement("div", { key: collection.uuid, className: "grid grid-cols-8 gap-5 py-3 border-divider items-center" },
                        react.createElement("div", { className: "col-span-6" },
                            react.createElement(Label, null, collection.name)),
                        react.createElement("div", { className: "col-span-2 flex items-center justify-end" },
                            react.createElement(RadioGroupItem, { value: collection.code })))))),
                    react.createElement(InputField, { type: "hidden", name: "settings[collection]", required: true, validation: {
                            required: 'Please select a collection'
                        }, defaultValue: selectedCollection }))))),
        react.createElement("div", { className: "mt-3 space-y-3" },
            react.createElement(NumberField, { name: "settings[count]", label: "Total products", defaultValue: count, required: true, validation: { min: 1, required: 'Count is required' }, min: 1, placeholder: "Number of products" }),
            react.createElement("div", { className: "form-field" },
                react.createElement(NumberField, { name: "settings[countPerRow]", label: "Products per row", min: 1, validation: { min: 1, required: 'Count per row is required' }, required: true, defaultValue: countPerRow, placeholder: "Number of products per row" })))));
}
/* harmony default export */ const components_CollectionProductsSetting = (CollectionProductsSetting);
const CollectionProductsSetting_query = (/* unused pure expression or super */ null && (`
  query Query($collection: String, $count: Int, $countPerRow: Int) {
    collectionProductsWidget(collection: $collection, count: $count, countPerRow: $countPerRow) {
      collection
      count
      countPerRow
    }
  }
`));
const variables = (/* unused pure expression or super */ null && (`{
  collection: getWidgetSetting("collection"),
  count: getWidgetSetting("count"),
  countPerRow: getWidgetSetting("countPerRow")
}`));
//# sourceMappingURL=CollectionProductsSetting.js.map
;// ./node_modules/@evershop/evershop/dist/modules/cms/components/TextBlockSetting.js




function TextBlockSetting({ textWidget: { text, className } }) {
    const { register, watch, setValue } = (0,index_esm/* useFormContext */.xW)();
    const editorValue = watch('temp_editor_text');
    react.useEffect(() => {
        if (editorValue) {
            setValue('settings.text', JSON.stringify(editorValue));
        }
    }, [editorValue, setValue]);
    return (react.createElement("div", { className: "space-y-3" },
        react.createElement(InputField, { label: "Custom CSS classes", name: "settings.className", defaultValue: className, helperText: "Custom CSS classes for the text block" }),
        react.createElement("input", { type: "hidden", ...register('settings.text'), defaultValue: typeof text === 'string' ? text : JSON.stringify(text) }),
        react.createElement(Editor, { name: "temp_editor_text", label: "Content", value: typeof text === 'string' ? JSON.parse(text) : text })));
}
const TextBlockSetting_query = (/* unused pure expression or super */ null && (`
  query Query($text: String, $className: String) {
    textWidget(text: $text, className: $className) {
      text
      className
    }
  }
`));
const TextBlockSetting_variables = (/* unused pure expression or super */ null && (`{
  text: getWidgetSetting("text"),
  className: getWidgetSetting("className")
}`));
//# sourceMappingURL=TextBlockSetting.js.map
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/checkbox/root/CheckboxRoot.js
var CheckboxRoot = __webpack_require__(8358);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/checkbox/indicator/CheckboxIndicator.js
var CheckboxIndicator = __webpack_require__(4342);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/check.js
var check = __webpack_require__(45773);
;// ./node_modules/@evershop/evershop/dist/components/common/ui/Checkbox.js




function Checkbox({ className, ...props }) {
    return (react.createElement(CheckboxRoot/* CheckboxRoot */.y, { "data-slot": "checkbox", className: cn('border-input dark:bg-input/30 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary aria-invalid:aria-checked:border-primary aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex size-4 items-center justify-center rounded-[4px] border shadow-xs transition-shadow group-has-disabled/field:opacity-50 focus-visible:ring-[3px] aria-invalid:ring-[3px] peer relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50', className), ...props },
        react.createElement(CheckboxIndicator/* CheckboxIndicator */.P, { "data-slot": "checkbox-indicator", className: "[&>svg]:size-3.5 grid place-content-center text-current transition-none" },
            react.createElement(check/* default */.A, null))));
}

//# sourceMappingURL=Checkbox.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/form/CheckboxField.js








function CheckboxField({ name, label, error, wrapperClassName, helperText, required, validation, options, defaultValue, direction = 'vertical', className, disabled, ...props }) {
    const { control, formState: { errors } } = (0,index_esm/* useFormContext */.xW)();
    const fieldError = getNestedError(name, errors, error);
    const fieldId = `field-${name}`;
    const validationRules = {
        ...validation,
        ...(required &&
            !(validation === null || validation === void 0 ? void 0 : validation.required) && {
            required: _('${field} is required', { field: label || name })
        })
    };
    const containerClass = direction === 'horizontal' ? 'checkbox-group horizontal' : 'checkbox-group';
    if (!options || options.length === 0) {
        return (react.createElement(Field, { "data-invalid": fieldError ? 'true' : 'false', className: wrapperClassName },
            react.createElement("div", { className: "flex items-center gap-2" },
                react.createElement(index_esm/* Controller */.xI, { name: name, control: control, rules: validationRules, defaultValue: defaultValue, render: ({ field }) => (react.createElement(Checkbox, { id: fieldId, checked: !!field.value, onCheckedChange: (checked) => field.onChange(checked), onBlur: field.onBlur, disabled: disabled, className: className, "aria-invalid": fieldError !== undefined ? 'true' : 'false', "aria-describedby": fieldError !== undefined
                            ? `${fieldId}-error`
                            : helperText
                                ? `${fieldId}-helper`
                                : undefined })) }),
                label && (react.createElement(FieldLabel, { htmlFor: fieldId, className: "text-sm font-normal cursor-pointer" },
                    label,
                    required && react.createElement("span", { className: "text-destructive" }, "*"),
                    helperText && react.createElement(Tooltip, { content: helperText, position: "top" })))),
            fieldError && react.createElement(FieldError, null, fieldError)));
    }
    return (react.createElement(Field, { "data-invalid": fieldError ? 'true' : 'false', className: wrapperClassName },
        label && (react.createElement("fieldset", null,
            react.createElement(FieldLegend, null,
                react.createElement(react.Fragment, null,
                    label,
                    required && react.createElement("span", { className: "text-destructive" }, "*"),
                    helperText && react.createElement(Tooltip, { content: helperText, position: "top" }))),
            react.createElement(index_esm/* Controller */.xI, { name: name, control: control, rules: validationRules, defaultValue: defaultValue, render: ({ field }) => (react.createElement("div", { className: containerClass }, options.map((option, index) => {
                    const isChecked = Array.isArray(field.value)
                        ? field.value.includes(option.value)
                        : false;
                    return (react.createElement("div", { key: option.value, className: "flex items-center gap-2" },
                        react.createElement(Checkbox, { id: `${fieldId}-${index}`, disabled: disabled || option.disabled, checked: isChecked, onCheckedChange: (checked) => {
                                const currentValues = Array.isArray(field.value)
                                    ? field.value
                                    : [];
                                if (checked) {
                                    field.onChange([...currentValues, option.value]);
                                }
                                else {
                                    field.onChange(currentValues.filter((val) => val !== option.value));
                                }
                            }, onBlur: field.onBlur, className: className, "aria-invalid": fieldError ? 'true' : 'false', "aria-describedby": fieldError ? `${fieldId}-error` : undefined }),
                        react.createElement(Label, { htmlFor: `${fieldId}-${index}`, className: `text-sm cursor-pointer ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}` }, option.label)));
                }))) }))),
        fieldError && react.createElement(FieldError, null, fieldError)));
}
//# sourceMappingURL=CheckboxField.js.map
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/dialog/root/DialogRoot.js + 2 modules
var DialogRoot = __webpack_require__(30523);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/dialog/trigger/DialogTrigger.js
var DialogTrigger = __webpack_require__(14872);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/dialog/portal/DialogPortal.js
var DialogPortal = __webpack_require__(15622);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/dialog/backdrop/DialogBackdrop.js
var DialogBackdrop = __webpack_require__(45418);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/dialog/popup/DialogPopup.js + 2 modules
var DialogPopup = __webpack_require__(67320);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/dialog/close/DialogClose.js
var DialogClose = __webpack_require__(46368);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/dialog/title/DialogTitle.js
var DialogTitle = __webpack_require__(1764);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/x.js
var x = __webpack_require__(48697);
;// ./node_modules/@evershop/evershop/dist/components/common/ui/Dialog.js
/* unused harmony import specifier */ var DialogPrimitive;
/* unused harmony import specifier */ var Dialog_Button;
/* unused harmony import specifier */ var Dialog_cn;
/* unused harmony import specifier */ var Dialog_React;





function Dialog({ ...props }) {
    return react.createElement(DialogRoot/* DialogRoot */.D, { "data-slot": "dialog", ...props });
}
function Dialog_DialogTrigger({ ...props }) {
    return react.createElement(DialogTrigger/* DialogTrigger */.z, { "data-slot": "dialog-trigger", ...props });
}
function Dialog_DialogPortal({ ...props }) {
    return react.createElement(DialogPortal/* DialogPortal */.Z, { "data-slot": "dialog-portal", ...props });
}
function Dialog_DialogClose({ ...props }) {
    return Dialog_React.createElement(DialogPrimitive.Close, { "data-slot": "dialog-close", ...props });
}
function DialogOverlay({ className, ...props }) {
    return (react.createElement(DialogBackdrop/* DialogBackdrop */.X, { "data-slot": "dialog-overlay", className: cn('data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-50', className), ...props }));
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return (react.createElement(Dialog_DialogPortal, null,
        react.createElement(DialogOverlay, null),
        react.createElement(DialogPopup/* DialogPopup */.h, { "data-slot": "dialog-content", className: cn('bg-background data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/10 grid max-w-[calc(100%-2rem)] gap-6 rounded-xl p-6 text-sm ring-1 duration-100 sm:max-w-md fixed top-1/2 left-1/2 z-1001 w-full -translate-x-1/2 -translate-y-1/2 outline-none', className), ...props },
            children,
            showCloseButton && (react.createElement(DialogClose/* DialogClose */.H, { "data-slot": "dialog-close", render: react.createElement(Button_Button, { variant: "ghost", className: "absolute top-4 right-4", size: "icon-sm" }) },
                react.createElement(x/* default */.A, null),
                react.createElement("span", { className: "sr-only" }, "Close"))))));
}
function DialogHeader({ className, ...props }) {
    return (react.createElement("div", { "data-slot": "dialog-header", className: cn('gap-2 flex flex-col', className), ...props }));
}
function DialogFooter({ className, showCloseButton = false, children, ...props }) {
    return (Dialog_React.createElement("div", { "data-slot": "dialog-footer", className: Dialog_cn('gap-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className), ...props },
        children,
        showCloseButton && (Dialog_React.createElement(DialogPrimitive.Close, { render: Dialog_React.createElement(Dialog_Button, { variant: "outline" }) }, "Close"))));
}
function Dialog_DialogTitle({ className, ...props }) {
    return (react.createElement(DialogTitle/* DialogTitle */.L, { "data-slot": "dialog-title", className: cn('leading-none font-medium', className), ...props }));
}
function DialogDescription({ className, ...props }) {
    return (Dialog_React.createElement(DialogPrimitive.Description, { "data-slot": "dialog-description", className: Dialog_cn('text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3', className), ...props }));
}

//# sourceMappingURL=Dialog.js.map
// EXTERNAL MODULE: ./node_modules/@dnd-kit/utilities/dist/utilities.esm.js
var utilities_esm = __webpack_require__(74979);
// EXTERNAL MODULE: ./node_modules/react-select/creatable/dist/react-select-creatable.esm.js + 1 modules
var react_select_creatable_esm = __webpack_require__(6373);
// EXTERNAL MODULE: ./node_modules/uniqid/index.js
var uniqid = __webpack_require__(9797);
var uniqid_default = /*#__PURE__*/__webpack_require__.n(uniqid);
;// ./node_modules/@evershop/evershop/dist/modules/cms/components/BasicMenuSetting.js

















const menuQuery = `
  query Query ($filters: [FilterInput]) {
    categories (filters: $filters) {
      items {
        value: uuid,
        label: name
        path {
          name
        }
      }
    }
    cmsPages (filters: $filters) {
      items {
        value: uuid,
        label: name
      }
    }
  }
`;
const SortableMenuItem = ({ item, updateItem, deleteItem, isChild = false }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = (0,sortable_esm/* useSortable */.gl)({ id: item.id });
    const [dialogOpen, setDialogOpen] = react.useState(false);
    const style = {
        transform: utilities_esm/* CSS */.Ks.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    };
    const [itemInEdit, setItemInEdit] = react.useState(item);
    const addChildren = (i) => {
        updateItem({
            ...item,
            children: [...item.children, i]
        });
    };
    const updateItemFunc = (i) => {
        if (i.id === item.id) {
            updateItem(i);
        }
        else {
            addChildren(i);
        }
        setDialogOpen(false);
    };
    return (react.createElement("div", { ref: setNodeRef, style: style, className: "flex justify-between py-2 px-2 bg-white border border-border rounded mb-2" },
        react.createElement("div", { className: "flex justify-start gap-3 items-center" },
            react.createElement("button", { type: "button", className: "cursor-move p-1", ...attributes, ...listeners },
                react.createElement("svg", { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", fill: "#949494", width: 20, height: 20 },
                    react.createElement("g", null,
                        react.createElement("path", { fill: "none", d: "M0 0h24v24H0z" }),
                        react.createElement("path", { fillRule: "nonzero", d: "M14 6h2v2h5a1 1 0 0 1 1 1v7.5L16 13l.036 8.062 2.223-2.15L20.041 22H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zm8 11.338V21a1 1 0 0 1-.048.307l-1.96-3.394L22 17.338zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" })))),
            react.createElement("div", null, item.name)),
        react.createElement("div", { className: "flex justify-end gap-3 items-center" },
            react.createElement(Button_Button, { variant: 'outline', onClick: () => {
                    setItemInEdit(item);
                    setDialogOpen(true);
                }, size: 'sm' }, "Edit"),
            !isChild && (react.createElement(Button_Button, { variant: 'outline', onClick: () => {
                    setItemInEdit({
                        id: uniqid_default()(),
                        name: '',
                        url: '',
                        type: 'category',
                        uuid: '',
                        children: []
                    });
                    setDialogOpen(true);
                }, size: 'sm' }, "Add child")),
            react.createElement(Button_Button, { variant: 'destructive', onClick: () => deleteItem(item) }, "Delete")),
        react.createElement(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen },
            react.createElement(DialogContent, null,
                react.createElement(DialogHeader, null,
                    react.createElement(Dialog_DialogTitle, null, `Edit Menu Item: ${itemInEdit.name}`)),
                react.createElement(MenuSettingPopup, { item: itemInEdit, updateItem: updateItemFunc })))));
};
const MenuSettingPopup = ({ item, updateItem }) => {
    var _a;
    const [currentItem, setCurrentItem] = react.useState(item);
    const [err, setErr] = react.useState(null);
    const [result] = (0,urql_es/* useQuery */.IT)({
        query: menuQuery,
        variables: {
            filters: []
        }
    });
    const { data, fetching, error } = result;
    if (fetching) {
        return (react.createElement(Item, { variant: 'outline' },
            react.createElement(ItemContent, null,
                react.createElement(admin_Spinner, { width: 25, height: 25 }))));
    }
    if (error) {
        return (react.createElement(Item, { variant: 'outline' },
            react.createElement(ItemContent, null,
                react.createElement("div", { className: "text-destructive" }, error.message))));
    }
    const groupOptions = [
        {
            label: 'Categories',
            options: data.categories.items.map((i) => ({
                ...i,
                label: i.path.map((p) => p.name).join(' > ')
            }))
        },
        {
            label: 'CMS Pages',
            options: data.cmsPages.items
        },
        {
            label: 'Custom',
            options: currentItem.type === 'custom'
                ? [
                    {
                        value: currentItem.uuid,
                        label: currentItem.uuid
                    }
                ]
                : []
        }
    ];
    const handleCreate = (inputValue) => {
        setCurrentItem({
            ...item,
            uuid: inputValue,
            name: inputValue,
            url: inputValue,
            type: 'custom'
        });
    };
    return (react.createElement("div", { className: "grid grid-flow-row gap-5" },
        react.createElement("div", null,
            react.createElement(Input_Input, { id: "menuName", type: "text", value: currentItem.name, placeholder: "Menu name", onChange: (e) => setCurrentItem({
                    ...currentItem,
                    name: e.target.value
                }), className: "w-full " })),
        react.createElement("div", null,
            react.createElement(react_select_creatable_esm/* default */.A, { isClearable: true, onChange: (newValue) => {
                    setCurrentItem({
                        ...currentItem,
                        uuid: (newValue === null || newValue === void 0 ? void 0 : newValue.value) || '',
                        name: (newValue === null || newValue === void 0 ? void 0 : newValue.label) || '',
                        type: (newValue === null || newValue === void 0 ? void 0 : newValue.__typename) === 'Category' ? 'category' : 'page'
                    });
                }, onCreateOption: handleCreate, options: groupOptions, value: {
                    value: currentItem.uuid,
                    label: currentItem.type === 'custom'
                        ? currentItem.uuid
                        : ((_a = [...groupOptions[0].options, ...groupOptions[1].options].find((option) => option.value === currentItem.uuid)) === null || _a === void 0 ? void 0 : _a.label) || ''
                } })),
        err && react.createElement("div", { className: "text-destructive" }, err),
        react.createElement("div", { className: "flex justify-end" },
            react.createElement(Button_Button, { onClick: () => {
                    if (currentItem.uuid === '') {
                        setErr('Please select a menu item');
                        return;
                    }
                    if (currentItem.name === '') {
                        setErr('Please enter a name');
                        return;
                    }
                    updateItem(currentItem);
                } }, "Save"))));
};
function BasicMenuSetting({ basicMenuWidget: { menus, isMain, className } }) {
    const { register, setValue } = (0,index_esm/* useFormContext */.xW)();
    const [items, setItems] = react.useState(menus);
    const [dialogOpen, setDialogOpen] = react.useState(false);
    const sensors = (0,core_esm/* useSensors */.FR)((0,core_esm/* useSensor */.MS)(core_esm/* PointerSensor */.AN), (0,core_esm/* useSensor */.MS)(core_esm/* KeyboardSensor */.uN, {
        coordinateGetter: sortable_esm/* sortableKeyboardCoordinates */.JR
    }));
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return (0,sortable_esm/* arrayMove */.be)(items, oldIndex, newIndex);
            });
        }
    };
    const handleChildDragEnd = (event, parentId) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setItems((items) => {
                return items.map((item) => {
                    if (item.id === parentId) {
                        const oldIndex = item.children.findIndex((child) => child.id === active.id);
                        const newIndex = item.children.findIndex((child) => child.id === over.id);
                        return {
                            ...item,
                            children: (0,sortable_esm/* arrayMove */.be)(item.children, oldIndex, newIndex)
                        };
                    }
                    return item;
                });
            });
        }
    };
    const updateItem = (item) => {
        setItems((prevItems) => {
            const newItems = prevItems.map((prevItem) => {
                if (prevItem.id === item.id) {
                    return item;
                }
                else if (prevItem.children.length > 0) {
                    return {
                        ...prevItem,
                        children: prevItem.children.map((child) => {
                            if (child.id === item.id) {
                                return item;
                            }
                            return child;
                        })
                    };
                }
                return prevItem;
            });
            return newItems;
        });
    };
    const deleteItem = (item) => {
        setItems((prevItems) => {
            const newItems = prevItems.filter((prevItem) => {
                if (prevItem.id === item.id) {
                    return false;
                }
                else if (prevItem.children.length > 0) {
                    prevItem.children = prevItem.children.filter((child) => child.id !== item.id);
                }
                return true;
            });
            return newItems;
        });
    };
    (0,react.useEffect)(() => {
        setValue('settings.menus', items);
    }, [items]);
    return (react.createElement(react.Fragment, null,
        react.createElement(core_esm/* DndContext */.Mp, { sensors: sensors, collisionDetection: core_esm/* closestCenter */.fp, onDragEnd: handleDragEnd },
            react.createElement(sortable_esm/* SortableContext */.gB, { items: items.map((item) => item.id), strategy: sortable_esm/* verticalListSortingStrategy */._G },
                react.createElement("div", { className: "space-y-2" }, items.map((menu) => (react.createElement("div", { key: menu.id },
                    react.createElement(SortableMenuItem, { item: menu, updateItem: updateItem, deleteItem: deleteItem }),
                    menu.children && menu.children.length > 0 && (react.createElement("div", { className: "ml-5 mt-2" },
                        react.createElement(core_esm/* DndContext */.Mp, { sensors: sensors, collisionDetection: core_esm/* closestCenter */.fp, onDragEnd: (event) => handleChildDragEnd(event, menu.id) },
                            react.createElement(sortable_esm/* SortableContext */.gB, { items: menu.children.map((child) => child.id), strategy: sortable_esm/* verticalListSortingStrategy */._G },
                                react.createElement("div", { className: "space-y-1" }, menu.children.map((child) => (react.createElement(SortableMenuItem, { key: child.id, item: child, updateItem: updateItem, deleteItem: deleteItem, isChild: true })))))))))))))),
        react.createElement("input", { type: "hidden", ...register('settings.menus'), value: JSON.stringify(items) }),
        react.createElement("div", { className: "space-y-3" },
            react.createElement(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen },
                react.createElement(Dialog_DialogTrigger, null,
                    react.createElement(Button_Button, { variant: 'outline', size: 'sm' }, "Add Menu Item")),
                react.createElement(DialogContent, null,
                    react.createElement(DialogHeader, null,
                        react.createElement(Dialog_DialogTitle, null, "Add Menu Item")),
                    react.createElement(MenuSettingPopup, { item: {
                            id: uniqid_default()(),
                            name: '',
                            url: '',
                            type: 'category',
                            uuid: '',
                            children: []
                        }, updateItem: (item) => {
                            setItems((prevItems) => [...prevItems, item]);
                            setDialogOpen(false);
                        } }))),
            react.createElement("div", null,
                react.createElement(CheckboxField, { label: "Is Main Menu?", name: "settings.isMain", defaultValue: isMain })),
            react.createElement("div", null,
                react.createElement(InputField, { label: "Custom CSS classes", name: "settings.className", defaultValue: className, helperText: "Custom CSS classes for the menu" })))));
}
const BasicMenuSetting_query = (/* unused pure expression or super */ null && (`
  query Query($settings: JSON) {
    basicMenuWidget(settings: $settings) {
      menus {
        id
        name
        url
        type
        uuid
        children {
          id
          name
          url
          type
          uuid
        }
      }
      isMain
      className
    }
  }
`));
const BasicMenuSetting_variables = (/* unused pure expression or super */ null && (`{
  settings: getWidgetSetting()
}`));
//# sourceMappingURL=BasicMenuSetting.js.map
;// ./node_modules/@evershop/evershop/dist/modules/cms/components/BannerSetting.js
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/img-redundant-alt */





function BannerSetting({ bannerWidget: { src, alignment = 'left', width, height, alt, link } }) {
    const { setValue, watch } = (0,index_esm/* useFormContext */.xW)();
    const image = watch('settings.src', src);
    const currentAlignment = watch('settings.alignment', alignment);
    const [openFileBrowser, setOpenFileBrowser] = react.useState(false);
    const [imageDimensions, setImageDimensions] = react.useState({
        width: width || 0,
        height: height || 0
    });
    // Function to get image dimensions
    const getImageDimensions = (imageUrl) => {
        if (!imageUrl)
            return;
        const img = new Image();
        img.onload = () => {
            const newWidth = img.naturalWidth;
            const newHeight = img.naturalHeight;
            setImageDimensions({ width: newWidth, height: newHeight });
            // Update form values
            setValue('settings.width', newWidth);
            setValue('settings.height', newHeight);
        };
        img.src = imageUrl;
    };
    // Get dimensions when image changes
    react.useEffect(() => {
        if (image) {
            getImageDimensions(image);
        }
    }, [image]);
    return (react.createElement("div", { className: `banner-widget space-y-3` },
        react.createElement("div", { className: "max-h-96" }, openFileBrowser && (react.createElement(FileBrowser, { isMultiple: false, onInsert: (file) => {
                setValue('settings.src', file);
                setOpenFileBrowser(false);
            }, close: () => setOpenFileBrowser(false) }))),
        react.createElement("div", { className: "w-full h-80 border border-gray-300 bg-gray-200 relative overflow-hidden" },
            react.createElement("div", { className: "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZjFmMWYxIj48L3JlY3Q+CiAgPHBhdGggZD0iTTAgMGgyMHYyMEgwVjB6IiBmaWxsPSJub25lIiBzdHJva2U9IiNlNWU1ZTUiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')]" }),
            react.createElement("div", { className: `flex h-full w-full ${currentAlignment === 'center'
                    ? 'justify-center'
                    : currentAlignment === 'right'
                        ? 'justify-end'
                        : 'justify-start'} p-4` }, image && (react.createElement("div", { className: `relative h-full flex items-center w-full ${currentAlignment === 'center'
                    ? 'justify-center'
                    : currentAlignment === 'right'
                        ? 'justify-end'
                        : 'justify-start'}` },
                react.createElement("img", { src: image, className: "h-auto max-h-full object-contain shadow-md rounded", style: {
                        maxWidth: '60%' // Consistent size for all alignments
                    }, onLoad: (e) => {
                        // This is a backup in case the useEffect doesn't trigger
                        const img = e.target;
                        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                            if (imageDimensions.width !== img.naturalWidth ||
                                imageDimensions.height !== img.naturalHeight) {
                                setImageDimensions({
                                    width: img.naturalWidth,
                                    height: img.naturalHeight
                                });
                                setValue('settings.width', img.naturalWidth);
                                setValue('settings.height', img.naturalHeight);
                            }
                        }
                    }, alt: "Banner Image" })))),
            react.createElement(Button_Button, { variant: "outline", onClick: (e) => {
                    e.preventDefault();
                    setOpenFileBrowser(true);
                }, className: "absolute bottom-2 right-2 z-10" }, "Select Image")),
        react.createElement(InputField, { type: "hidden", name: "settings.src", defaultValue: image || '' }),
        react.createElement("div", { className: "mb-4" },
            react.createElement("div", { className: "mb-2" },
                react.createElement("label", null, "Alignment")),
            react.createElement("div", { className: "grid grid-cols-3 gap-2" },
                react.createElement("div", { onClick: () => {
                        setValue('settings.alignment', 'left');
                    }, className: `border p-3 flex justify-center items-center cursor-pointer ${currentAlignment === 'left'
                        ? 'border-blue-500 bg-blue-100'
                        : 'border-gray-300'}` },
                    react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                        react.createElement("line", { x1: "5", y1: "6", x2: "19", y2: "6" }),
                        react.createElement("line", { x1: "5", y1: "12", x2: "12", y2: "12" }),
                        react.createElement("line", { x1: "5", y1: "18", x2: "16", y2: "18" }))),
                react.createElement("div", { onClick: () => {
                        setValue('settings.alignment', 'center');
                    }, className: `border p-3 flex justify-center items-center cursor-pointer ${currentAlignment === 'center'
                        ? 'border-blue-500 bg-blue-100'
                        : 'border-gray-300'}` },
                    react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                        react.createElement("line", { x1: "5", y1: "6", x2: "19", y2: "6" }),
                        react.createElement("line", { x1: "8", y1: "12", x2: "16", y2: "12" }),
                        react.createElement("line", { x1: "6", y1: "18", x2: "18", y2: "18" }))),
                react.createElement("div", { onClick: () => {
                        setValue('settings.alignment', 'right');
                    }, className: `border p-3 flex justify-center items-center cursor-pointer ${currentAlignment === 'right'
                        ? 'border-blue-500 bg-blue-100'
                        : 'border-gray-300'}` },
                    react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                        react.createElement("line", { x1: "5", y1: "6", x2: "19", y2: "6" }),
                        react.createElement("line", { x1: "12", y1: "12", x2: "19", y2: "12" }),
                        react.createElement("line", { x1: "8", y1: "18", x2: "19", y2: "18" })))),
            react.createElement(InputField, { type: "hidden", name: "settings.alignment", defaultValue: alignment })),
        react.createElement(InputField, { type: "hidden", name: "settings.width", defaultValue: width || imageDimensions.width }),
        react.createElement(InputField, { type: "hidden", name: "settings.height", defaultValue: height || imageDimensions.height }),
        react.createElement("div", { className: "mb-4" },
            react.createElement("div", { className: "text-sm text-gray-500" },
                "Image dimensions: ",
                imageDimensions.width,
                " \u00D7 ",
                imageDimensions.height,
                ' ',
                "pixels")),
        react.createElement(InputField, { type: "text", label: "Alt Text", placeholder: 'e.g., "Promotional Banner"', name: "settings.alt", defaultValue: alt }),
        react.createElement(InputField, { type: "text", placeholder: "e.g., https://example.com", label: "Banner Link", name: "settings.link", defaultValue: link || '' })));
}
const BannerSetting_query = (/* unused pure expression or super */ null && (`
  query Query($src: String, $alignment: String, $width: Float, $height: Float, $alt: String) {
    bannerWidget(src: $src, alignment: $alignment, width: $width, height: $height, alt: $alt) {
      src
      alignment
      width
      height
      alt
    }
  }
`));
const BannerSetting_variables = (/* unused pure expression or super */ null && (`{
  src: getWidgetSetting("src"),
  alignment: getWidgetSetting("alignment"),
  width: getWidgetSetting("width"),
  height: getWidgetSetting("height"),
  alt: getWidgetSetting("alt")
}`));
//# sourceMappingURL=BannerSetting.js.map
;// ./node_modules/@evershop/evershop/dist/modules/cms/components/SlideshowSetting.js
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */










function SlideshowSetting({ slideshowWidget }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    const { slides = [], autoplay = true, autoplaySpeed = 3000, arrows = true, dots = true, fullWidth = true, widthValue = 1920, heightValue = 800, heightType = 'auto' } = slideshowWidget || {};
    const { control, setValue, watch } = (0,index_esm/* useFormContext */.xW)();
    const { fields, append, remove, move } = (0,index_esm/* useFieldArray */.jz)({
        control,
        name: 'settings.slides'
    });
    const currentSlides = watch('settings.slides', slides);
    const currentAutoplay = watch('settings.autoplay', autoplay);
    const currentAutoplaySpeed = watch('settings.autoplaySpeed', autoplaySpeed);
    const currentArrows = watch('settings.arrows', arrows);
    const currentDots = watch('settings.dots', dots);
    const currentFullWidth = watch('settings.fullWidth', fullWidth);
    (0,react.useEffect)(() => {
        // Initialize slides with existing data
        setValue('settings.slides', (currentSlides === null || currentSlides === void 0 ? void 0 : currentSlides.length) ? currentSlides : []);
        // Initialize the autoplay settings
        const handleAutoplay = currentAutoplay === undefined || currentAutoplay === null
            ? autoplay
            : Boolean(currentAutoplay);
        setValue('settings.autoplay', handleAutoplay);
        // Initialize the autoplay speed
        const speed = Number(currentAutoplaySpeed) || Number(autoplaySpeed) || 3000;
        setValue('settings.autoplaySpeed', speed);
        // Initialize the arrows setting
        const handleArrows = currentArrows === undefined || currentArrows === null
            ? arrows
            : Boolean(currentArrows);
        setValue('settings.arrows', handleArrows);
        // Initialize the dots setting
        const handleDots = currentDots === undefined || currentDots === null
            ? dots
            : Boolean(currentDots);
        setValue('settings.dots', handleDots);
        // Initialize the fullWidth setting
        const handleFullWidth = currentFullWidth === undefined || currentFullWidth === null
            ? fullWidth
            : Boolean(currentFullWidth);
        setValue('settings.fullWidth', handleFullWidth);
        // Always use adaptive height for the slideshow
        setValue('settings.heightType', 'auto');
        // Process all slides to detect image dimensions if they don't have them yet
        if (currentSlides === null || currentSlides === void 0 ? void 0 : currentSlides.length) {
            currentSlides.forEach((slide, index) => {
                if (slide.image && (!slide.width || !slide.height)) {
                    getImageDimensions(slide.image, index);
                }
            });
        }
    }, []);
    const [activeSlideIndex, setActiveSlideIndex] = react.useState(null);
    const [openFileBrowser, setOpenFileBrowser] = react.useState(false);
    // Function to get image dimensions
    const getImageDimensions = (imageUrl, slideIndex) => {
        if (!imageUrl)
            return;
        const img = new Image();
        img.onload = () => {
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            // Update the current slides with the new dimensions
            const newSlides = [...currentSlides];
            newSlides[slideIndex] = {
                ...newSlides[slideIndex],
                width,
                height
            };
            setValue('settings.slides', newSlides);
        };
        img.src = imageUrl;
    };
    const handleImageSelect = (image) => {
        if (activeSlideIndex !== null) {
            setValue(`settings.slides.${activeSlideIndex}.image`, image);
            // Detect image dimensions when a new image is selected
            getImageDimensions(image, activeSlideIndex);
            setOpenFileBrowser(false);
        }
    };
    const addSlide = () => {
        const newSlide = {
            id: (0,v4/* default */.A)(),
            image: '',
            width: 0, // Will be automatically set when image is selected
            height: 0, // Will be automatically set when image is selected
            headline: '',
            subText: '',
            buttonText: '',
            buttonLink: '',
            buttonColor: '#3B82F6' // Default blue color
        };
        append(newSlide);
        setTimeout(() => {
            setActiveSlideIndex(fields.length);
        }, 50);
    };
    const moveUp = (index) => {
        if (index > 0) {
            move(index, index - 1);
            setActiveSlideIndex(index - 1);
        }
    };
    const moveDown = (index) => {
        if (index < fields.length - 1) {
            move(index, index + 1);
            setActiveSlideIndex(index + 1);
        }
    };
    return (react.createElement("div", { className: "slideshow-widget" },
        openFileBrowser && (react.createElement("div", { className: "max-h-96" },
            react.createElement(FileBrowser, { isMultiple: false, onInsert: handleImageSelect, close: () => setOpenFileBrowser(false) }))),
        react.createElement(Item, { variant: 'outline' },
            react.createElement(ItemContent, null,
                react.createElement(ItemTitle, null, "Slideshow Settings"),
                react.createElement("div", { className: "space-y-2 mt-3" },
                    react.createElement("div", { className: "col-span-2 md:col-span-1 space-y-2" },
                        react.createElement("div", { className: "flex items-center mb-4" },
                            react.createElement(Checkbox, { id: "arrows", checked: Boolean(currentArrows), onCheckedChange: (checked) => {
                                    setValue('settings.arrows', checked);
                                }, className: "mr-2 h-4 w-4" }),
                            react.createElement(Label, { htmlFor: "arrows" }, "Show Navigation Arrows")),
                        react.createElement("div", { className: "flex justify-start items-center" },
                            react.createElement(Checkbox, { id: "autoplay", checked: Boolean(currentAutoplay), onCheckedChange: (checked) => {
                                    setValue('settings.autoplay', checked);
                                }, className: "mr-2 h-4 w-4" }),
                            react.createElement(Label, { htmlFor: "autoplay", className: "text-sm" }, "Enable Autoplay")),
                        Boolean(currentAutoplay) && (react.createElement(InputField, { type: "number", label: "Autoplay Speed (ms)", name: "settings.autoplaySpeed", defaultValue: Number(autoplaySpeed) || 3000, placeholder: "e.g., 3000 for 3 seconds", validation: {
                                min: { value: 1000, message: 'Minimum speed is 1000ms' }
                            } }))),
                    react.createElement("div", { className: "col-span-2 md:col-span-1" })))),
        react.createElement("div", { className: "mt-4" },
            react.createElement("div", { className: "flex justify-between items-center mb-2" },
                react.createElement("h2", { className: "text-lg font-medium" }, "Slides"),
                react.createElement(Button_Button, { onClick: addSlide, variant: 'outline' }, "Add New Slide")),
            fields.length > 0 ? (react.createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4" }, fields.map((slide, index) => {
                var _a, _b;
                return (react.createElement("div", { key: slide.id, onClick: () => setActiveSlideIndex(index), className: `relative border border-border rounded overflow-hidden cursor-pointer ${activeSlideIndex === index ? 'ring-2 ring-blue-500' : ''}` },
                    react.createElement("div", { className: "aspect-[16/9] bg-gray-100 flex items-center justify-center" }, ((_a = currentSlides[index]) === null || _a === void 0 ? void 0 : _a.image) ? (react.createElement("img", { src: currentSlides[index].image, alt: `Slide ${index + 1}`, className: "w-full h-full object-cover" })) : (react.createElement("div", { className: "text-gray-400" }, "No Image"))),
                    react.createElement("div", { className: "p-2 bg-white border-t border-border" },
                        react.createElement("p", { className: "text-sm font-medium truncate" }, ((_b = currentSlides[index]) === null || _b === void 0 ? void 0 : _b.headline) || `Slide ${index + 1}`),
                        react.createElement("div", { className: "flex mt-2" },
                            react.createElement(Button_Button, { variant: 'outline', size: 'sm', onClick: (e) => {
                                    e.stopPropagation();
                                    moveUp(index);
                                }, disabled: index === 0, className: `mr-1 p-1` },
                                react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                                    react.createElement("path", { d: "M18 15l-6-6-6 6" }))),
                            react.createElement(Button_Button, { type: "button", size: 'sm', onClick: (e) => {
                                    e.stopPropagation();
                                    moveDown(index);
                                }, disabled: index === fields.length - 1, className: `mr-1 p-1` },
                                react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                                    react.createElement("path", { d: "M6 9l6 6 6-6" }))),
                            react.createElement(Button_Button, { variant: "destructive", size: 'sm', onClick: (e) => {
                                    e.stopPropagation();
                                    remove(index);
                                    if (activeSlideIndex === index) {
                                        setActiveSlideIndex(null);
                                    }
                                    else if (activeSlideIndex !== null &&
                                        activeSlideIndex > index) {
                                        setActiveSlideIndex(activeSlideIndex - 1);
                                    }
                                } },
                                react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" },
                                    react.createElement("path", { d: "M3 6h18" }),
                                    react.createElement("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }),
                                    react.createElement("path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" })))))));
            }))) : (react.createElement("div", { className: "bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center mb-4" },
                react.createElement("p", { className: "text-gray-500 mb-4" }, "No slides have been added yet."),
                react.createElement(Button_Button, { variant: "outline", onClick: addSlide }, "Add Your First Slide")))),
        activeSlideIndex !== null && fields[activeSlideIndex] && (react.createElement("div", { className: "bg-white p-4 rounded border border-border" },
            react.createElement("h3", { className: "text-sm font-normal mb-4" },
                "Edit Slide ",
                activeSlideIndex + 1),
            react.createElement("div", { className: "mb-2 border border-border rounded overflow-hidden" },
                react.createElement("div", { className: "aspect-[16/9] bg-gray-100 relative" },
                    ((_a = currentSlides[activeSlideIndex]) === null || _a === void 0 ? void 0 : _a.image) ? (react.createElement("div", { className: "relative w-full h-full" },
                        react.createElement("img", { src: currentSlides[activeSlideIndex].image, alt: `Slide ${activeSlideIndex + 1}`, className: "w-full h-full object-cover", onLoad: (e) => {
                                var _a, _b;
                                // Additional dimensions detection when the preview image loads
                                const img = e.target;
                                if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                                    if (!((_a = currentSlides[activeSlideIndex]) === null || _a === void 0 ? void 0 : _a.width) ||
                                        !((_b = currentSlides[activeSlideIndex]) === null || _b === void 0 ? void 0 : _b.height)) {
                                        const newSlides = [...currentSlides];
                                        newSlides[activeSlideIndex] = {
                                            ...newSlides[activeSlideIndex],
                                            width: img.naturalWidth,
                                            height: img.naturalHeight
                                        };
                                        setValue('settings.slides', newSlides);
                                    }
                                }
                            } }),
                        react.createElement("div", { className: "absolute inset-0 flex flex-col items-center justify-center p-4 text-center" },
                            ((_b = currentSlides[activeSlideIndex]) === null || _b === void 0 ? void 0 : _b.headline) && (react.createElement("h3", { className: "text-white text-xl md:text-2xl font-bold mb-2" }, currentSlides[activeSlideIndex].headline)),
                            ((_c = currentSlides[activeSlideIndex]) === null || _c === void 0 ? void 0 : _c.subText) && (react.createElement("p", { className: "text-white mb-4" }, currentSlides[activeSlideIndex].subText)),
                            ((_d = currentSlides[activeSlideIndex]) === null || _d === void 0 ? void 0 : _d.buttonText) && (react.createElement("button", { type: "button", className: "px-4 py-2 rounded", style: {
                                    backgroundColor: currentSlides[activeSlideIndex].buttonColor ||
                                        '#3B82F6'
                                } }, currentSlides[activeSlideIndex].buttonText))))) : (react.createElement("div", { className: "w-full h-full flex items-center justify-center" },
                        react.createElement(Button_Button, { variant: "outline", onClick: () => setOpenFileBrowser(true) }, "Select Image"))),
                    ((_e = currentSlides[activeSlideIndex]) === null || _e === void 0 ? void 0 : _e.image) && (react.createElement(Button_Button, { variant: "outline", onClick: () => setOpenFileBrowser(true), className: "absolute bottom-2 right-2" }, "Change Image")))),
            react.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                react.createElement("input", { type: "hidden", name: `settings.slides.${activeSlideIndex}.image`, value: (currentSlides && ((_f = currentSlides[activeSlideIndex]) === null || _f === void 0 ? void 0 : _f.image)) || '' }),
                react.createElement("input", { type: "hidden", name: `settings.slides.${activeSlideIndex}.id`, value: (currentSlides && ((_g = currentSlides[activeSlideIndex]) === null || _g === void 0 ? void 0 : _g.id)) ||
                        (0,v4/* default */.A)() }),
                react.createElement("input", { type: "hidden", name: `settings.slides.${activeSlideIndex}.width`, value: ((_h = currentSlides[activeSlideIndex]) === null || _h === void 0 ? void 0 : _h.width) || 0 }),
                react.createElement("input", { type: "hidden", name: `settings.slides.${activeSlideIndex}.height`, value: ((_j = currentSlides[activeSlideIndex]) === null || _j === void 0 ? void 0 : _j.height) || 0 }),
                ((_k = currentSlides[activeSlideIndex]) === null || _k === void 0 ? void 0 : _k.image) && (react.createElement("div", { className: "md:col-span-2 mb-2" },
                    react.createElement("div", { className: "text-sm text-gray-500" }, ((_l = currentSlides[activeSlideIndex]) === null || _l === void 0 ? void 0 : _l.width) &&
                        ((_m = currentSlides[activeSlideIndex]) === null || _m === void 0 ? void 0 : _m.height) ? (react.createElement("p", null,
                        "Image dimensions: ",
                        currentSlides[activeSlideIndex].width,
                        ' ',
                        "\u00D7 ",
                        currentSlides[activeSlideIndex].height,
                        " pixels")) : (react.createElement("p", null, "Detecting image dimensions..."))))),
                react.createElement("div", { className: "md:col-span-2" },
                    react.createElement("label", { className: "block mb-1 text-sm" }, "Headline"),
                    react.createElement("input", { type: "text", className: "w-full p-2 border border-gray-300 rounded", name: `settings.slides.${activeSlideIndex}.headline`, value: ((_o = currentSlides[activeSlideIndex]) === null || _o === void 0 ? void 0 : _o.headline) || '', onChange: (e) => {
                            const newSlides = [...currentSlides];
                            newSlides[activeSlideIndex] = {
                                ...newSlides[activeSlideIndex],
                                headline: e.target.value
                            };
                            setValue('settings.slides', newSlides);
                        }, placeholder: "e.g., New Collection Available" })),
                react.createElement("div", { className: "md:col-span-2" },
                    react.createElement("label", { className: "block mb-1 text-sm" }, "Sub Text"),
                    react.createElement("textarea", { className: "w-full p-2 border border-gray-300 rounded", name: `settings.slides.${activeSlideIndex}.subText`, value: ((_p = currentSlides[activeSlideIndex]) === null || _p === void 0 ? void 0 : _p.subText) || '', onChange: (e) => {
                            const newSlides = [...currentSlides];
                            newSlides[activeSlideIndex] = {
                                ...newSlides[activeSlideIndex],
                                subText: e.target.value
                            };
                            setValue('settings.slides', newSlides);
                        }, placeholder: "e.g., Check out our latest products with special discounts", rows: 3 })),
                react.createElement("div", null,
                    react.createElement("label", { className: "block mb-1 text-sm" }, "Button Text"),
                    react.createElement("input", { type: "text", className: "w-full p-2 border border-gray-300 rounded", name: `settings.slides.${activeSlideIndex}.buttonText`, value: ((_q = currentSlides[activeSlideIndex]) === null || _q === void 0 ? void 0 : _q.buttonText) || '', onChange: (e) => {
                            const newSlides = [...currentSlides];
                            newSlides[activeSlideIndex] = {
                                ...newSlides[activeSlideIndex],
                                buttonText: e.target.value
                            };
                            setValue('settings.slides', newSlides);
                        }, placeholder: "e.g., Shop Now" })),
                react.createElement("div", null,
                    react.createElement("label", { className: "block mb-1 text-sm" }, "Button Link"),
                    react.createElement("input", { type: "text", className: "w-full p-2 border border-gray-300 rounded", name: `settings.slides.${activeSlideIndex}.buttonLink`, value: ((_r = currentSlides[activeSlideIndex]) === null || _r === void 0 ? void 0 : _r.buttonLink) || '', onChange: (e) => {
                            const newSlides = [...currentSlides];
                            newSlides[activeSlideIndex] = {
                                ...newSlides[activeSlideIndex],
                                buttonLink: e.target.value
                            };
                            setValue('settings.slides', newSlides);
                        }, placeholder: "e.g., /category/new-arrivals" })),
                react.createElement("div", null,
                    react.createElement("label", { className: "block mb-1 text-sm" }, "Button Color"),
                    react.createElement("div", { className: "flex items-center" },
                        react.createElement("input", { type: "color", value: ((_s = currentSlides[activeSlideIndex]) === null || _s === void 0 ? void 0 : _s.buttonColor) || '#3B82F6', onChange: (e) => {
                                const newSlides = [...currentSlides];
                                newSlides[activeSlideIndex] = {
                                    ...newSlides[activeSlideIndex],
                                    buttonColor: e.target.value
                                };
                                setValue('settings.slides', newSlides);
                            }, className: "w-10 h-10 rounded border-border mr-2 cursor-pointer" }),
                        react.createElement(Input_Input, { type: "text", value: ((_t = currentSlides[activeSlideIndex]) === null || _t === void 0 ? void 0 : _t.buttonColor) || '#3B82F6', onChange: (e) => {
                                const newSlides = [...currentSlides];
                                newSlides[activeSlideIndex] = {
                                    ...newSlides[activeSlideIndex],
                                    buttonColor: e.target.value
                                };
                                setValue('settings.slides', newSlides);
                            }, placeholder: "#3B82F6" }))))))));
}
const SlideshowSetting_query = (/* unused pure expression or super */ null && (`
  query Query($slides: [SlideInput], $autoplay: Boolean, $autoplaySpeed: Int, $arrows: Boolean, $dots: Boolean) {
    slideshowWidget(
      slides: $slides, 
      autoplay: $autoplay, 
      autoplaySpeed: $autoplaySpeed, 
      arrows: $arrows, 
      dots: $dots,
    ) {
      slides {
        id
        image
        width
        height
        headline
        subText
        buttonText
        buttonLink
        buttonColor
      }
      autoplay
      autoplaySpeed
      arrows
      dots
    }
  }
`));
const fragments = (/* unused pure expression or super */ null && (`
  fragment SlideData on Slide {
    id
    image
    width
    height
    headline
    subText
    buttonText
    buttonLink
    buttonColor
  }
`));
const SlideshowSetting_variables = (/* unused pure expression or super */ null && (`{
  slides: getWidgetSetting("slides"),
  autoplay: getWidgetSetting("autoplay"),
  autoplaySpeed: getWidgetSetting("autoplaySpeed"),
  arrows: getWidgetSetting("arrows"),
  dots: getWidgetSetting("dots"),
}`));
//# sourceMappingURL=SlideshowSetting.js.map
;// ./.evershop/build/admin/cmsPageNew/client/entry.js

      
      
      
      
      



































common_Area.defaultProps.components = {
  header: {
    e5ff59c35: {
      id: 'e5ff59c35',
      sortOrder: 50,
      component: { default: AdminUser }
    },
    e4865135d: {
      id: 'e4865135d',
      sortOrder: 10,
      component: { default: Logo }
    },
    e6c0a83c3: {
      id: 'e6c0a83c3',
      sortOrder: 20,
      component: { default: SearchBox }
    }
  },
  head: {
    e7af11667: {
      id: 'e7af11667',
      sortOrder: 5,
      component: { default: FormCss }
    },
    e03c5f5ba: {
      id: 'e03c5f5ba',
      sortOrder: 5,
      component: { default: GlobalCss }
    },
    e6c640cc3: {
      id: 'e6c640cc3',
      sortOrder: 5,
      component: { default: SeoMeta }
    },
    e01fa0885: {
      id: 'e01fa0885',
      sortOrder: 1,
      component: { default: TailwindCss }
    }
  },
  body: {
    e2be61ec2: {
      id: 'e2be61ec2',
      sortOrder: 10,
      component: { default: AdminLayout }
    },
    e0e4a071d: {
      id: 'e0e4a071d',
      sortOrder: 10,
      component: { default: Notification }
    }
  },
  adminMenu: {
    e2252096f: {
      id: 'e2252096f',
      sortOrder: 20,
      component: { default: CatalogMenuGroup }
    },
    e59719b71: {
      id: 'e59719b71',
      sortOrder: 60,
      component: { default: CmsMenuGroup }
    },
    e5c7a3adc: {
      id: 'e5c7a3adc',
      sortOrder: 10,
      component: { default: QuickLinks }
    },
    e2859f9a9: {
      id: 'e2859f9a9',
      sortOrder: 40,
      component: { default: CustomerMenuGroup }
    },
    e61e39389: {
      id: 'e61e39389',
      sortOrder: 30,
      component: { default: OmsMenuGroup }
    },
    e7d98dd4e: {
      id: 'e7d98dd4e',
      sortOrder: 50,
      component: { default: CouponMenuGroup_CatalogMenuGroup }
    },
    e3a71d701: {
      id: 'e3a71d701',
      sortOrder: 500,
      component: { default: SettingMenuGroup_CmsMenuGroup }
    }
  },
  quickLinks: {
    e03a11002: {
      id: 'e03a11002',
      sortOrder: 20,
      component: { default: NewProductQuickLink }
    },
    e0560d3df: {
      id: 'e0560d3df',
      sortOrder: 30,
      component: { default: NewCouponQuickLink_NewProductQuickLink }
    }
  },
  settingPageMenu: {
    e2ed34ff0: {
      id: 'e2ed34ff0',
      sortOrder: 15,
      component: { default: ShippingSettingMenu }
    },
    e3b127666: {
      id: 'e3b127666',
      sortOrder: 10,
      component: { default: PaymentSettingMenu }
    },
    e34640001: {
      id: 'e34640001',
      sortOrder: 5,
      component: { default: StoreSettingMenu }
    },
    e6279c81a: {
      id: 'e6279c81a',
      sortOrder: 20,
      component: { default: TaxSettingMenu }
    }
  },
  footerLeft: {
    e52431361: {
      id: 'e52431361',
      sortOrder: 10,
      component: { default: CopyRight }
    },
    e19b3198e: {
      id: 'e19b3198e',
      sortOrder: 20,
      component: { default: Version }
    }
  },
  adminNavigation: {
    e4da0ae6c: {
      id: 'e4da0ae6c',
      sortOrder: 10,
      component: { default: AdminNavigation }
    }
  },
  content: {
    e6a88d8f2: {
      id: 'e6a88d8f2',
      sortOrder: 999,
      component: { default: Survey }
    },
    e1b748f45: {
      id: 'e1b748f45',
      sortOrder: 5,
      component: { default: CmsGridPageHeading }
    },
    e5433825e: {
      id: 'e5433825e',
      sortOrder: 10,
      component: { default: CmsPageNewForm }
    }
  },
  wideScreen: {
    e0b61c05a: {
      id: 'e0b61c05a',
      sortOrder: 10,
      component: { default: General }
    },
    e0b5b3f91: {
      id: 'e0b5b3f91',
      sortOrder: 30,
      component: { default: Seo }
    }
  },
  '*': {
    e281f9e5a: {
      id: 'e281f9e5a',
      sortOrder: 0,
      component: { default: components_CollectionProductsSetting }
    },
    e5077e91a: {
      id: 'e5077e91a',
      sortOrder: 0,
      component: { default: TextBlockSetting }
    },
    e15549945: {
      id: 'e15549945',
      sortOrder: 0,
      component: { default: BasicMenuSetting }
    },
    e5a2d2c97: {
      id: 'e5a2d2c97',
      sortOrder: 0,
      component: { default: BannerSetting }
    },
    e221633bd: {
      id: 'e221633bd',
      sortOrder: 0,
      component: { default: SlideshowSetting }
    }
  }
} 
react_dom.hydrate(
        react.createElement(HydrateAdmin, null),
        document.getElementById('app')
      );

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames not based on template
/******/ 			if (chunkId === 9601) return "chunks/e9e7edde1f331774d177.js";
/******/ 			if (chunkId === 7276) return "chunks/22a21ef192115e2003cb.js";
/******/ 			if (chunkId === 9149) return "chunks/a10e2e1402b3d3ce6f1a.js";
/******/ 			if (chunkId === 9461) return "chunks/216036db3bcb77cc6a60.js";
/******/ 			if (chunkId === 4057) return "chunks/0a764b48bc92934dae96.js";
/******/ 			if (chunkId === 6845) return "chunks/6c95b65c93978057ceb3.js";
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "myevershop:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/runtimeId */
/******/ 	(() => {
/******/ 		__webpack_require__.j = 3675;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/assets/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			3675: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkmyevershop"] = self["webpackChunkmyevershop"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [7755], () => (__webpack_require__(98272)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;