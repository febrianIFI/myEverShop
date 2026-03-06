/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 71280
(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(96540);
// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(40961);
// EXTERNAL MODULE: ./node_modules/immer/dist/immer.mjs
var immer = __webpack_require__(1932);
;// ./node_modules/@evershop/evershop/dist/components/common/context/app.js


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
const useAppDispatch = () => react.useContext(AppContextDispatch);
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
;// ./node_modules/@evershop/evershop/dist/components/common/ui/Card.js
/* unused harmony import specifier */ var Card_cn;
/* unused harmony import specifier */ var React;


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
    return (React.createElement("div", { "data-slot": "card-description", className: Card_cn('text-muted-foreground text-sm', className), ...props }));
}
function CardAction({ className, ...props }) {
    return (React.createElement("div", { "data-slot": "card-action", className: Card_cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className), ...props }));
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
/* unused harmony import specifier */ var HydrateAdmin_React;
/* unused harmony import specifier */ var HydrateAdmin_Hydrate;



const client = (0,urql_core/* createClient */.UU)({
    url: '/api/admin/graphql'
});
function HydrateAdmin() {
    return HydrateAdmin_React.createElement(HydrateAdmin_Hydrate, { client: client });
}
//# sourceMappingURL=HydrateAdmin.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/react/client/HydrateFrontStore.js



const HydrateFrontStore_client = (0,urql_core/* createClient */.UU)({
    url: '/api/graphql'
});
function HydrateFrontStore() {
    return react.createElement(Hydrate, { client: HydrateFrontStore_client });
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
;// ./node_modules/@evershop/evershop/dist/components/common/LoadingBar.js



const LoadingBar = function LoadingBar() {
    const { fetching } = useAppState();
    const [width, setWidth] = react.useState(0);
    const widthRef = react.useRef(0);
    react.useEffect(() => {
        widthRef.current = width;
        if (fetching === true) {
            // Random number between 1 and 3
            const step = Math.random() * (3 - 1) + 1;
            // Random number between 85 and 95
            const peak = Math.random() * (95 - 85) + 85;
            if (widthRef.current < peak) {
                const timer = setTimeout(() => setWidth(widthRef.current + step), 0);
                return () => clearTimeout(timer);
            }
        }
        else if (widthRef.current === 100) {
            setWidth(0);
            widthRef.current = 0;
        }
        else if (widthRef.current !== 0) {
            setWidth(100);
        }
    });
    return (react.createElement("div", { className: "loading-bar", style: {
            width: `${width}%`,
            display: fetching === true ? 'block' : 'none'
        } }));
};

//# sourceMappingURL=LoadingBar.js.map
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
;// ./node_modules/@evershop/evershop/dist/components/frontStore/cart/CartContext.js




const ShippingMethodsQuery = `
  query GetCartShippingMethods($country: String!, $province: String, $postcode: String) {
    myCart {
      availableShippingMethods(country: $country, province: $province, postcode: $postcode) {
        code
        name
        cost {
          value
          text
        }
      }
    }
  }
`;
var CartSyncTrigger;
(function (CartSyncTrigger) {
    CartSyncTrigger["ADD_ITEM"] = "addItem";
    CartSyncTrigger["REMOVE_ITEM"] = "removeItem";
    CartSyncTrigger["UPDATE_ITEM"] = "updateItem";
    CartSyncTrigger["ADD_PAYMENT_METHOD"] = "addPaymentMethod";
    CartSyncTrigger["ADD_SHIPPING_METHOD"] = "addShippingMethod";
    CartSyncTrigger["ADD_SHIPPING_ADDRESS"] = "addShippingAddress";
    CartSyncTrigger["ADD_BILLING_ADDRESS"] = "addBillingAddress";
    CartSyncTrigger["ADD_CONTACT_INFO"] = "addContactInfo";
    CartSyncTrigger["APPLY_COUPON"] = "applyCoupon";
    CartSyncTrigger["REMOVE_COUPON"] = "removeCoupon";
})(CartSyncTrigger || (CartSyncTrigger = {}));
const cartReducer = (state, action) => {
    return (0,immer/* produce */.jM)(state, (draft) => {
        switch (action.type) {
            case 'SET_CART':
                if (draft.data) {
                    Object.assign(draft.data, action.payload);
                    draft.data.error = null;
                }
                else {
                    draft.data = action.payload;
                }
                // Clear all loading states when cart is set
                draft.loadingStates = {
                    addingItem: false,
                    removingItem: null,
                    updatingItem: null,
                    addingPaymentMethod: false,
                    addingShippingMethod: false,
                    addingShippingAddress: false,
                    addingBillingAddress: false,
                    addingContactInfo: false,
                    applyingCoupon: false,
                    removingCoupon: false,
                    fetchingShippingMethods: false
                };
                draft.loading = false;
                break;
            case 'SET_SPECIFIC_LOADING':
                const { operation, loading, itemId } = action.payload;
                if (operation === 'removingItem' || operation === 'updatingItem') {
                    draft.loadingStates[operation] = loading ? itemId || null : null;
                }
                else {
                    draft.loadingStates[operation] = loading;
                }
                // Update overall loading state based on loadingStates
                draft.loading = Object.values(draft.loadingStates).some((state) => state === true || (typeof state === 'string' && state !== null));
                break;
            case 'SET_ERROR':
                if (draft.data) {
                    draft.data.error = action.payload;
                }
                // Clear all loading states on error
                draft.loadingStates = {
                    addingItem: false,
                    removingItem: null,
                    updatingItem: null,
                    addingPaymentMethod: false,
                    addingShippingMethod: false,
                    addingShippingAddress: false,
                    addingBillingAddress: false,
                    addingContactInfo: false,
                    applyingCoupon: false,
                    removingCoupon: false,
                    fetchingShippingMethods: false
                };
                draft.loading = false;
                break;
            case 'CLEAR_ERROR':
                if (draft.data) {
                    draft.data.error = null;
                    draft.data.errors = [];
                }
                break;
            case 'SET_SYNC_STATUS':
                Object.assign(draft.syncStatus, action.payload);
                break;
        }
    });
};
const CartStateContext = (0,react.createContext)(undefined);
const CartDispatchContext = (0,react.createContext)(undefined);
const initialEmptyState = {
    data: {
        currency: 'USD',
        addItemApi: '', // initial addItemApi
        items: [],
        totalQty: 0,
        noShippingRequired: false,
        totalWeight: { value: 0, unit: 'kg' },
        billingAddress: undefined,
        shippingAddress: undefined,
        errors: [],
        error: null,
        taxAmount: { value: 0, text: '0.00' },
        totalTaxAmount: { value: 0, text: '0.00' },
        taxAmountBeforeDiscount: { value: 0, text: '0.00' },
        discountAmount: { value: 0, text: '0.00' },
        shippingFeeExclTax: { value: 0, text: '0.00' },
        shippingFeeInclTax: { value: 0, text: '0.00' },
        shippingTaxAmount: { value: 0, text: '0.00' },
        subTotal: { value: 0, text: '0.00' },
        subTotalInclTax: { value: 0, text: '0.00' },
        subTotalWithDiscount: { value: 0, text: '0.00' },
        subTotalWithDiscountInclTax: { value: 0, text: '0.00' },
        grandTotal: { value: 0, text: '0.00' },
        createdAt: { value: '', text: '' },
        updatedAt: { value: '', text: '' },
        coupon: '',
        addPaymentMethodApi: '', // Will be set by server
        addShippingMethodApi: '', // Will be set by server
        addAddressApi: '', // Will be set by server
        applyCouponApi: '', // Will be set by server
        addNoteApi: '', // Will be set by server
        addContactInfoApi: '', // Will be set by server
        checkoutApi: '', // Will be set by server
        availablePaymentMethods: [],
        availableShippingMethods: []
    },
    loading: false,
    loadingStates: {
        addingItem: false,
        removingItem: null,
        updatingItem: null,
        addingPaymentMethod: false,
        addingShippingMethod: false,
        addingShippingAddress: false,
        addingBillingAddress: false,
        addingContactInfo: false,
        applyingCoupon: false,
        removingCoupon: false,
        fetchingShippingMethods: false
    },
    syncStatus: {
        syncing: false,
        synced: false,
        trigger: undefined
    }
};
const CartProvider = ({ children, query, cart, addMineCartItemApi }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const client = (0,urql_es/* useClient */.tH)(); // Get urql client for GraphQL queries
    const hydratedInitialState = {
        loading: initialEmptyState.loading,
        loadingStates: { ...initialEmptyState.loadingStates },
        syncStatus: { ...initialEmptyState.syncStatus }
    };
    if (cart) {
        hydratedInitialState.data = cart;
    }
    else {
        hydratedInitialState.data = {
            ...initialEmptyState.data,
            addItemApi: addMineCartItemApi
        };
    }
    const [state, dispatch] = (0,react.useReducer)(cartReducer, hydratedInitialState);
    // Use urql to query cart data
    const [cartQueryResult, refetchCart] = (0,urql_es/* useQuery */.IT)({
        query: query,
        pause: true
    });
    const retry = async function (fn, retries = 2, delay = 1000) {
        try {
            return await fn();
        }
        catch (error) {
            if (retries > 0) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                return retry(fn, retries - 1, delay * 2);
            }
            throw error;
        }
    };
    const syncCartWithServer = (0,react.useCallback)(async (trigger) => {
        try {
            // Set syncing to true and synced to false when starting sync
            dispatch({
                type: 'SET_SYNC_STATUS',
                payload: { syncing: true, synced: false, trigger }
            });
            await refetchCart({ requestPolicy: 'network-only' });
            // Set syncing to false and synced to true on success
            dispatch({
                type: 'SET_SYNC_STATUS',
                payload: { syncing: false, synced: true, trigger }
            });
        }
        catch (error) {
            dispatch({
                type: 'SET_ERROR',
                payload: error instanceof Error ? error.message : 'Failed to sync cart'
            });
            // Set syncing to false and keep synced as false on error
            dispatch({
                type: 'SET_SYNC_STATUS',
                payload: { syncing: false, synced: false, trigger }
            });
        }
    }, [refetchCart]);
    // Effect to update cart when GraphQL query result changes
    react.useEffect(() => {
        var _a;
        // Only process if we have fetched data (either successful or error state)
        if (cartQueryResult.fetching === false) {
            if ((_a = cartQueryResult.data) === null || _a === void 0 ? void 0 : _a.myCart) {
                const serverCart = cartQueryResult.data.myCart;
                dispatch({
                    type: 'SET_CART',
                    payload: serverCart
                });
            }
            else if (cartQueryResult.error) {
                // Handle error case
                dispatch({
                    type: 'SET_ERROR',
                    payload: cartQueryResult.error.message || 'Failed to fetch cart data'
                });
            }
            else if (cartQueryResult.operation) {
                // Query executed but returned no data - initialize empty cart
                dispatch({
                    type: 'SET_CART',
                    payload: {
                        ...initialEmptyState.data,
                        addItemApi: addMineCartItemApi
                    }
                });
            }
        }
    }, [
        cartQueryResult.data,
        cartQueryResult.error,
        cartQueryResult.fetching,
        cartQueryResult.operation
    ]);
    react.useEffect(() => {
        if (cart && JSON.stringify(cart) !== JSON.stringify(state.data)) {
            dispatch({ type: 'SET_CART', payload: cart });
        }
    }, [cart]);
    const addItem = (0,react.useCallback)(async (payload) => {
        var _a;
        if (!state.data) {
            throw new Error('Cannot add item: cart not initialized');
        }
        try {
            // Set specific loading state
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'addingItem', loading: true }
            });
            // Server request with retry
            const response = await retry(() => fetch(state.data.addItemApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }));
            const json = (await response.json());
            if (!response.ok) {
                throw new Error(((_a = json.error) === null || _a === void 0 ? void 0 : _a.message) || 'Failed to add item.');
            }
            // Sync with server (both immediate update and GraphQL refetch)
            await syncCartWithServer(CartSyncTrigger.ADD_ITEM);
        }
        catch (error) {
            dispatch({
                type: 'SET_ERROR',
                payload: error instanceof Error ? error.message : 'Failed to add item'
            });
            throw error;
        }
        finally {
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'addingItem', loading: false }
            });
        }
    }, [(_a = state.data) === null || _a === void 0 ? void 0 : _a.addItemApi, syncCartWithServer]);
    const removeItem = (0,react.useCallback)(async (itemId) => {
        var _a;
        if (!state.data) {
            throw new Error('Cannot remove item: cart not initialized');
        }
        const item = state.data.items.find((item) => item.cartItemId === itemId);
        if (!item) {
            throw new Error('Item not found in cart');
        }
        try {
            // Set specific loading state for this item
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'removingItem', loading: true, itemId }
            });
            // Server request with retry using item's remove API
            const response = await retry(() => fetch(item.removeApi, {
                method: 'DELETE'
            }));
            const json = await response.json();
            if (!response.ok) {
                throw new Error(((_a = json.error) === null || _a === void 0 ? void 0 : _a.message) || 'Failed to remove item.');
            }
            // Sync with server (both immediate update and GraphQL refetch)
            await syncCartWithServer(CartSyncTrigger.REMOVE_ITEM);
        }
        catch (error) {
            dispatch({
                type: 'SET_ERROR',
                payload: error instanceof Error ? error.message : 'Failed to remove item'
            });
            throw error;
        }
        finally {
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'removingItem', loading: false }
            });
        }
    }, [state, syncCartWithServer]);
    const updateItem = (0,react.useCallback)(async (itemId, payload) => {
        var _a;
        if (!state.data) {
            throw new Error('Cannot update item: cart not initialized');
        }
        const item = state.data.items.find((item) => item.cartItemId === itemId);
        if (!item) {
            throw new Error('Item not found in cart');
        }
        try {
            // Set specific loading state for this item
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'updatingItem', loading: true, itemId }
            });
            // Server request with retry using item's update API
            const response = await retry(() => fetch(item.updateQtyApi, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }));
            const json = await response.json();
            if (!response.ok) {
                throw new Error(((_a = json.error) === null || _a === void 0 ? void 0 : _a.message) || 'Failed to update item.');
            }
            // Sync with server (both immediate update and GraphQL refetch)
            await syncCartWithServer(CartSyncTrigger.UPDATE_ITEM);
        }
        catch (error) {
            dispatch({
                type: 'SET_ERROR',
                payload: error instanceof Error ? error.message : 'Failed to update item'
            });
            throw error;
        }
        finally {
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'updatingItem', loading: false }
            });
        }
    }, [state, syncCartWithServer]);
    // Clear error function
    const clearError = (0,react.useCallback)(() => {
        dispatch({ type: 'CLEAR_ERROR' });
    }, []);
    // Add payment method
    const addPaymentMethod = (0,react.useCallback)(async (code, name) => {
        var _a;
        if (!state.data) {
            throw new Error(_('Cannot add payment method: cart not initialized'));
        }
        try {
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'addingPaymentMethod', loading: true }
            });
            const response = await retry(() => fetch(state.data.addPaymentMethodApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ method_code: code, method_name: name })
            }));
            const json = await response.json();
            if (!response.ok) {
                throw new Error(((_a = json.error) === null || _a === void 0 ? void 0 : _a.message) || _('Failed to add payment method.'));
            }
            // Sync with server (both immediate update and GraphQL refetch)
            await syncCartWithServer(CartSyncTrigger.ADD_PAYMENT_METHOD);
        }
        catch (error) {
            dispatch({
                type: 'SET_ERROR',
                payload: error instanceof Error
                    ? error.message
                    : _('Failed to add payment method')
            });
            throw error;
        }
        finally {
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'addingPaymentMethod', loading: false }
            });
        }
    }, [(_b = state.data) === null || _b === void 0 ? void 0 : _b.addPaymentMethodApi, syncCartWithServer]);
    // Add shipping method
    const addShippingMethod = (0,react.useCallback)(async (code, name) => {
        var _a;
        if (!state.data) {
            throw new Error(_('Cannot add shipping method: cart not initialized'));
        }
        try {
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'addingShippingMethod', loading: true }
            });
            const response = await retry(() => fetch(state.data.addShippingMethodApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ method_code: code, method_name: name })
            }));
            const json = await response.json();
            if (!response.ok) {
                throw new Error(((_a = json.error) === null || _a === void 0 ? void 0 : _a.message) || _('Failed to add shipping method.'));
            }
            // Sync with server (both immediate update and GraphQL refetch)
            await syncCartWithServer(CartSyncTrigger.ADD_SHIPPING_METHOD);
        }
        catch (error) {
            dispatch({
                type: 'SET_ERROR',
                payload: error instanceof Error
                    ? error.message
                    : _('Failed to add shipping method')
            });
            throw error;
        }
        finally {
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'addingShippingMethod', loading: false }
            });
        }
    }, [(_c = state.data) === null || _c === void 0 ? void 0 : _c.addShippingMethodApi, syncCartWithServer]);
    // Add shipping address
    const addShippingAddress = (0,react.useCallback)(async (address) => {
        var _a;
        if (!state.data) {
            throw new Error(_('Cannot add shipping address: cart not initialized'));
        }
        try {
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'addingShippingAddress', loading: true }
            });
            const response = await retry(() => fetch(state.data.addAddressApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address: { ...address }, type: 'shipping' })
            }));
            const json = await response.json();
            if (!response.ok) {
                throw new Error(((_a = json.error) === null || _a === void 0 ? void 0 : _a.message) || _('Failed to add shipping address.'));
            }
            // Sync with server (both immediate update and GraphQL refetch)
            await syncCartWithServer(CartSyncTrigger.ADD_SHIPPING_ADDRESS);
        }
        catch (error) {
            dispatch({
                type: 'SET_ERROR',
                payload: error instanceof Error
                    ? error.message
                    : _('Failed to add shipping address')
            });
            throw error;
        }
        finally {
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'addingShippingAddress', loading: false }
            });
        }
    }, [(_d = state.data) === null || _d === void 0 ? void 0 : _d.addAddressApi, syncCartWithServer]);
    // Add billing address
    const addBillingAddress = (0,react.useCallback)(async (address) => {
        var _a;
        if (!state.data) {
            throw new Error(_('Cannot add billing address: cart not initialized'));
        }
        try {
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'addingBillingAddress', loading: true }
            });
            const response = await retry(() => fetch(state.data.addAddressApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address: { ...address }, type: 'billing' })
            }));
            const json = await response.json();
            if (!response.ok) {
                throw new Error(((_a = json.error) === null || _a === void 0 ? void 0 : _a.message) || _('Failed to add billing address.'));
            }
            // Sync with server (both immediate update and GraphQL refetch)
            await syncCartWithServer(CartSyncTrigger.ADD_BILLING_ADDRESS);
        }
        catch (error) {
            dispatch({
                type: 'SET_ERROR',
                payload: error instanceof Error
                    ? error.message
                    : _('Failed to add billing address')
            });
            throw error;
        }
        finally {
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'addingBillingAddress', loading: false }
            });
        }
    }, [(_e = state.data) === null || _e === void 0 ? void 0 : _e.addAddressApi, syncCartWithServer]);
    // Add contact info
    const addContactInfo = (0,react.useCallback)(async (contactInfo) => {
        var _a;
        if (!state.data) {
            throw new Error(_('Cannot add contact info: cart not initialized'));
        }
        try {
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'addingContactInfo', loading: true }
            });
            const response = await retry(() => fetch(state.data.addContactInfoApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactInfo)
            }));
            const json = await response.json();
            if (!response.ok) {
                throw new Error(((_a = json.error) === null || _a === void 0 ? void 0 : _a.message) || _('Failed to add contact info.'));
            }
            // Sync with server (both immediate update and GraphQL refetch)
            await syncCartWithServer(CartSyncTrigger.ADD_CONTACT_INFO);
        }
        catch (error) {
            dispatch({
                type: 'SET_ERROR',
                payload: error instanceof Error
                    ? error.message
                    : _('Failed to add contact info')
            });
            throw error;
        }
        finally {
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'addingContactInfo', loading: false }
            });
        }
    }, [(_f = state.data) === null || _f === void 0 ? void 0 : _f.addContactInfoApi, syncCartWithServer]);
    // Apply coupon
    const applyCoupon = (0,react.useCallback)(async (couponCode) => {
        var _a;
        if (!state.data) {
            throw new Error(_('Cannot apply coupon: cart not initialized'));
        }
        try {
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'applyingCoupon', loading: true }
            });
            const response = await retry(() => fetch(state.data.applyCouponApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ coupon: couponCode })
            }));
            const json = await response.json();
            if (!response.ok) {
                throw new Error(((_a = json.error) === null || _a === void 0 ? void 0 : _a.message) || 'Failed to apply coupon.');
            }
            // Sync with server (both immediate update and GraphQL refetch)
            await syncCartWithServer(CartSyncTrigger.APPLY_COUPON);
        }
        catch (error) {
            dispatch({
                type: 'SET_ERROR',
                payload: error instanceof Error ? error.message : 'Failed to apply coupon'
            });
            throw error;
        }
        finally {
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'applyingCoupon', loading: false }
            });
        }
    }, [(_g = state.data) === null || _g === void 0 ? void 0 : _g.applyCouponApi, syncCartWithServer]);
    // Remove coupon
    const removeCoupon = (0,react.useCallback)(async () => {
        var _a, _b;
        if (!state.data) {
            throw new Error(_('Cannot remove coupon: cart not initialized'));
        }
        if (!((_a = state.data) === null || _a === void 0 ? void 0 : _a.removeCouponApi)) {
            throw new Error(_('No coupon to remove'));
        }
        try {
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'removingCoupon', loading: true }
            });
            const response = await retry(() => fetch(state.data.removeCouponApi, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            }));
            const json = await response.json();
            if (!response.ok) {
                throw new Error(((_b = json.error) === null || _b === void 0 ? void 0 : _b.message) || _('Failed to remove coupon.'));
            }
            // Sync with server (both immediate update and GraphQL refetch)
            await syncCartWithServer(CartSyncTrigger.REMOVE_COUPON);
        }
        catch (error) {
            dispatch({
                type: 'SET_ERROR',
                payload: error instanceof Error ? error.message : _('Failed to remove coupon')
            });
            throw error;
        }
        finally {
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'removingCoupon', loading: false }
            });
        }
    }, [(_h = state.data) === null || _h === void 0 ? void 0 : _h.removeCouponApi, syncCartWithServer]);
    // Check if shipping is required
    // Note: Currently assumes all items require shipping
    // If you need to support virtual/downloadable products, add a 'virtual' or 'requiresShipping' field to CartItem
    const isShippingRequired = (0,react.useCallback)(() => {
        if (!state.data)
            return false;
        // If there are items in the cart, shipping is required
        // This can be enhanced with a virtual/downloadable product check if needed
        return state.data.items.length > 0;
    }, [(_j = state.data) === null || _j === void 0 ? void 0 : _j.items]);
    // Check if cart is ready for checkout
    const isReadyForCheckout = (0,react.useCallback)(() => {
        if (!state.data)
            return false;
        const hasItems = state.data.items.length > 0;
        const hasBillingAddress = !!state.data.billingAddress;
        const hasShippingAddress = !isShippingRequired() || !!state.data.shippingAddress;
        const noErrors = state.data.errors.length === 0;
        return hasItems && hasBillingAddress && hasShippingAddress && noErrors;
    }, [state.data, isShippingRequired]);
    // Get validation errors
    const getErrors = (0,react.useCallback)(() => {
        var _a, _b;
        return (_b = (_a = state.data) === null || _a === void 0 ? void 0 : _a.errors) !== null && _b !== void 0 ? _b : [];
    }, [(_k = state.data) === null || _k === void 0 ? void 0 : _k.errors]);
    // Get cart ID
    const getId = (0,react.useCallback)(() => {
        var _a, _b;
        return (_b = (_a = state.data) === null || _a === void 0 ? void 0 : _a.uuid) !== null && _b !== void 0 ? _b : null;
    }, [(_l = state.data) === null || _l === void 0 ? void 0 : _l.uuid]);
    // Fetch available shipping methods based on address parameters and update cart state
    const fetchAvailableShippingMethods = (0,react.useCallback)(async (params) => {
        var _a, _b, _c;
        if (!((_a = state.data) === null || _a === void 0 ? void 0 : _a.uuid)) {
            throw new Error('Cannot fetch shipping methods: cart not initialized');
        }
        try {
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'fetchingShippingMethods', loading: true }
            });
            const result = await client
                .query(ShippingMethodsQuery, {
                country: params.country,
                province: params.province || null,
                postcode: params.postcode || null
            })
                .toPromise();
            if (result.error) {
                throw new Error(result.error.message || 'Failed to fetch shipping methods');
            }
            // Update cart state with new shipping methods
            if ((_c = (_b = result.data) === null || _b === void 0 ? void 0 : _b.myCart) === null || _c === void 0 ? void 0 : _c.availableShippingMethods) {
                dispatch({
                    type: 'SET_CART',
                    payload: {
                        availableShippingMethods: result.data.myCart.availableShippingMethods
                    }
                });
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : 'Failed to fetch shipping methods';
            dispatch({
                type: 'SET_ERROR',
                payload: errorMessage
            });
            throw new Error(errorMessage);
        }
        finally {
            dispatch({
                type: 'SET_SPECIFIC_LOADING',
                payload: { operation: 'fetchingShippingMethods', loading: false }
            });
        }
    }, [(_m = state.data) === null || _m === void 0 ? void 0 : _m.uuid, client]);
    const cartDispatch = {
        addItem,
        removeItem,
        updateItem,
        addPaymentMethod,
        addShippingMethod,
        addShippingAddress,
        addBillingAddress,
        addContactInfo,
        applyCoupon,
        removeCoupon,
        clearError,
        isShippingRequired,
        isReadyForCheckout,
        getErrors,
        getId,
        fetchAvailableShippingMethods,
        syncCartWithServer
    };
    return (react.createElement(CartStateContext.Provider, { value: state },
        react.createElement(CartDispatchContext.Provider, { value: cartDispatch }, children)));
};
const useCartState = () => {
    const context = (0,react.useContext)(CartStateContext);
    if (!context) {
        throw new Error('useCartState must be used within a CartProvider');
    }
    return context;
};
const useCartDispatch = () => {
    const context = (0,react.useContext)(CartDispatchContext);
    if (!context) {
        throw new Error('useCartDispatch must be used within a CartProvider');
    }
    return context;
};
//# sourceMappingURL=CartContext.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/customer/CustomerContext.js
/* unused harmony import specifier */ var useContext;




const initialState = {
    customer: undefined,
    isLoading: false
};
const customerReducer = (state, action) => {
    return (0,immer/* produce */.jM)(state, (draft) => {
        switch (action.type) {
            case 'SET_LOADING':
                draft.isLoading = action.payload;
                break;
            case 'SET_CUSTOMER':
                draft.customer = action.payload;
                draft.isLoading = false;
                break;
            case 'LOGOUT':
                draft.customer = undefined;
                draft.isLoading = false;
                break;
        }
    });
};
const CustomerContext = (0,react.createContext)(undefined);
const CustomerDispatchContext = (0,react.createContext)(undefined);
const retry = async (fn, retries = 3, delay = 1000) => {
    try {
        return await fn();
    }
    catch (error) {
        if (retries > 0) {
            await new Promise((resolve) => setTimeout(resolve, delay));
            return retry(fn, retries - 1, delay * 2);
        }
        throw error;
    }
};
function CustomerProvider({ children, loginAPI, registerAPI, logoutAPI, initialCustomer }) {
    const [state, dispatch] = (0,react.useReducer)(customerReducer, {
        ...initialState,
        customer: initialCustomer
    });
    const appDispatch = useAppDispatch();
    // Effect to update customer when initialCustomer prop changes
    (0,react.useEffect)(() => {
        // Compare by JSON string to handle object changes properly
        const currentCustomerStr = JSON.stringify(state.customer);
        const initialCustomerStr = JSON.stringify(initialCustomer);
        if (initialCustomerStr !== currentCustomerStr) {
            dispatch({ type: 'SET_CUSTOMER', payload: initialCustomer });
        }
    }, [initialCustomer]);
    // Helper function to get current URL with isAjax=true
    const getCurrentAjaxUrl = (0,react.useCallback)(() => {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('ajax', 'true');
        return currentUrl.toString();
    }, []);
    // Login function
    const login = (0,react.useCallback)(async (data, redirectUrl) => {
        var _a;
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await retry(() => fetch(loginAPI, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }));
            const json = await response.json();
            if (!response.ok) {
                throw new Error(((_a = json.error) === null || _a === void 0 ? void 0 : _a.message) || _('Login failed'));
            }
            // Trigger page data refresh which will update customer via useEffect
            await appDispatch.fetchPageData(getCurrentAjaxUrl());
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
            return true;
        }
        catch (error) {
            dispatch({ type: 'SET_LOADING', payload: false });
            throw error;
        }
    }, [loginAPI, appDispatch, getCurrentAjaxUrl]);
    const register = (0,react.useCallback)(async (data, loginIfSuccess, redirectUrl) => {
        var _a;
        if (state.customer) {
            throw new Error(_('You are already logged in'));
        }
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await retry(() => fetch(registerAPI, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }));
            const json = await response.json();
            if (!response.ok) {
                throw new Error(((_a = json.error) === null || _a === void 0 ? void 0 : _a.message) || _('Registration failed'));
            }
            // Trigger page data refresh which will update customer via useEffect
            await appDispatch.fetchPageData(getCurrentAjaxUrl());
            if (loginIfSuccess) {
                // Auto login after successful registration
                await login({ email: data.email, password: data.password }, redirectUrl);
            }
            return true;
        }
        catch (error) {
            dispatch({ type: 'SET_LOADING', payload: false });
            throw error;
        }
    }, [registerAPI, appDispatch, getCurrentAjaxUrl, login]);
    // Logout function
    const logout = (0,react.useCallback)(async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            await retry(() => fetch(logoutAPI, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            }));
            // After successful logout, clear customer data locally
            dispatch({ type: 'LOGOUT' });
        }
        catch (error) {
            // Even if logout API fails, clear local customer data
            dispatch({ type: 'LOGOUT' });
            throw error;
        }
        finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, [logoutAPI]);
    // Set customer directly (for external updates)
    const setCustomer = (0,react.useCallback)((customer) => {
        dispatch({ type: 'SET_CUSTOMER', payload: customer });
    }, []);
    // Add address function
    const addAddress = (0,react.useCallback)(async (addressData) => {
        var _a, _b;
        if (!((_a = state.customer) === null || _a === void 0 ? void 0 : _a.addAddressApi)) {
            throw new Error(_('Add address API not available'));
        }
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await retry(() => fetch(state.customer.addAddressApi, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addressData)
        }));
        const json = await response.json();
        if (!response.ok) {
            throw new Error(((_b = json.error) === null || _b === void 0 ? void 0 : _b.message) || _('Failed to add address'));
        }
        if (json.error) {
            throw new Error(json.error.message || _('Failed to add address'));
        }
        // Sync with server to get fresh customer data including the new address
        await appDispatch.fetchPageData(getCurrentAjaxUrl());
        // Return the address from the API response for immediate use
        const newAddress = json.data;
        if (!newAddress) {
            throw new Error(_('No address data received'));
        }
        return newAddress;
    }, [state.customer, appDispatch, getCurrentAjaxUrl]);
    // Update address function
    const updateAddress = (0,react.useCallback)(async (addressId, addressData) => {
        var _a, _b, _c;
        const address = (_b = (_a = state.customer) === null || _a === void 0 ? void 0 : _a.addresses) === null || _b === void 0 ? void 0 : _b.find((addr) => addr.addressId === addressId);
        if (!(address === null || address === void 0 ? void 0 : address.updateApi)) {
            throw new Error(_('Update address API not available'));
        }
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await retry(() => fetch(address.updateApi, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addressData)
        }));
        const json = await response.json();
        if (!response.ok) {
            throw new Error(((_c = json.error) === null || _c === void 0 ? void 0 : _c.message) || _('Failed to update address'));
        }
        if (json.error) {
            throw new Error(json.error.message || _('Failed to update address'));
        }
        // Sync with server to get fresh customer data including the updated address
        await appDispatch.fetchPageData(getCurrentAjaxUrl());
        // Return the address from the API response for immediate use
        const updatedAddress = json.data;
        if (!updatedAddress) {
            throw new Error(_('No address data received'));
        }
        return updatedAddress;
    }, [state.customer, appDispatch, getCurrentAjaxUrl]);
    // Delete address function
    const deleteAddress = (0,react.useCallback)(async (addressId) => {
        var _a, _b, _c;
        const address = (_b = (_a = state.customer) === null || _a === void 0 ? void 0 : _a.addresses) === null || _b === void 0 ? void 0 : _b.find((addr) => addr.addressId === addressId);
        if (!(address === null || address === void 0 ? void 0 : address.deleteApi)) {
            throw new Error(_('Delete address API not available'));
        }
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await retry(() => fetch(address.deleteApi, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }));
        const json = await response.json();
        if (!response.ok) {
            throw new Error(((_c = json.error) === null || _c === void 0 ? void 0 : _c.message) || _('Failed to delete address'));
        }
        if (json.error) {
            throw new Error(json.error.message || _('Failed to delete address'));
        }
        await appDispatch.fetchPageData(getCurrentAjaxUrl());
    }, [state.customer, appDispatch, getCurrentAjaxUrl]);
    const contextValue = (0,react.useMemo)(() => ({
        ...state
    }), [state]);
    const dispatchMethods = (0,react.useMemo)(() => ({
        login,
        register,
        logout,
        setCustomer,
        addAddress,
        updateAddress,
        deleteAddress
    }), [login, logout, setCustomer, addAddress, updateAddress, deleteAddress]);
    return (react.createElement(CustomerDispatchContext.Provider, { value: dispatchMethods },
        react.createElement(CustomerContext.Provider, { value: contextValue }, children)));
}
const useCustomer = () => {
    const context = useContext(CustomerContext);
    if (context === undefined) {
        throw new Error('useCustomer must be used within a CustomerProvider');
    }
    return context;
};
const useCustomerDispatch = () => {
    const context = useContext(CustomerDispatchContext);
    if (context === undefined) {
        throw new Error('useCustomerDispatch must be used within a CustomerProvider');
    }
    return context;
};
//# sourceMappingURL=CustomerContext.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/Footer.js


function Footer({ copyRight }) {
    return (react.createElement("footer", { className: "footer bg-gray-100 mt-24 pt-2.5 pb-2.5 border-t border-gray-300" },
        react.createElement(common_Area, { id: "footerTop", className: "footer__top" }),
        react.createElement("div", { className: "footer__middle flex justify-between items-center" },
            react.createElement(common_Area, { id: "footerMiddleLeft", className: "footer__middle__left" }),
            react.createElement(common_Area, { id: "footerMiddleCenter", className: "footer__middle__center" }),
            react.createElement(common_Area, { id: "footerMiddleRight", className: "footer__middle__right" })),
        react.createElement(common_Area, { id: "footerBottom", className: "footer__bottom", coreComponents: [
                {
                    component: {
                        default: (react.createElement("div", { className: "page-width grid grid-cols-1 md:grid-cols-2 gap-5 justify-between" },
                            react.createElement("div", null,
                                react.createElement("div", { className: "card-icons flex justify-center space-x-2 md:justify-start" },
                                    react.createElement("div", null,
                                        react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "38", height: "24", "aria-labelledby": "pi-visa", viewBox: "0 0 38 24", className: "h-10" },
                                            react.createElement("path", { d: "M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z", opacity: "0.07" }),
                                            react.createElement("path", { fill: "#fff", d: "M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" }),
                                            react.createElement("path", { fill: "#142688", d: "M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" }))),
                                    react.createElement("div", null,
                                        react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "38", height: "24", "aria-labelledby": "pi-master", viewBox: "0 0 38 24", className: "h-10" },
                                            react.createElement("path", { d: "M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z", opacity: "0.07" }),
                                            react.createElement("path", { fill: "#fff", d: "M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" }),
                                            react.createElement("circle", { cx: "15", cy: "12", r: "7", fill: "#EB001B" }),
                                            react.createElement("circle", { cx: "23", cy: "12", r: "7", fill: "#F79E1B" }),
                                            react.createElement("path", { fill: "#FF5F00", d: "M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z" }))),
                                    react.createElement("div", null,
                                        react.createElement("svg", { viewBox: "0 0 38 24", xmlns: "http://www.w3.org/2000/svg", width: "38", height: "24", role: "img", "aria-labelledby": "pi-paypal", className: "h-10" },
                                            react.createElement("title", { id: "pi-paypal" }, "PayPal"),
                                            react.createElement("path", { opacity: ".07", d: "M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" }),
                                            react.createElement("path", { fill: "#fff", d: "M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" }),
                                            react.createElement("path", { fill: "#003087", d: "M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z" }),
                                            react.createElement("path", { fill: "#3086C8", d: "M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z" }),
                                            react.createElement("path", { fill: "#012169", d: "M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z" }))))),
                            react.createElement("div", { className: "self-center" },
                                react.createElement("div", { className: "copyright text-center md:text-right text-textSubdued" },
                                    react.createElement("span", null, copyRight)))))
                    },
                    sortOrder: 10
                }
            ] })));
}
//# sourceMappingURL=Footer.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/Header.js


function Header() {
    return (react.createElement("header", { className: "header px-6" },
        react.createElement(common_Area, { id: "headerTop", className: "header__top" }),
        react.createElement("div", { className: "header__middle grid grid-cols-3" },
            react.createElement(common_Area, { id: "headerMiddleLeft", className: "header__middle__left flex justify-start items-center" }),
            react.createElement(common_Area, { id: "headerMiddleCenter", className: "header__middle__center flex justify-center items-center" }),
            react.createElement(common_Area, { id: "headerMiddleRight", className: "header__middle__right flex justify-end items-center gap-3" })),
        react.createElement(common_Area, { id: "headerBottom", className: "header__bottom" })));
}
//# sourceMappingURL=Header.js.map
;// ./node_modules/@evershop/evershop/dist/modules/base/pages/frontStore/all/Base.js







function Base({ myCart, customer, themeConfig, addMineCartItemApi, loginApi, logoutApi, registerApi }) {
    return (react.createElement(CustomerProvider, { initialCustomer: customer, loginAPI: loginApi, logoutAPI: logoutApi, registerAPI: registerApi },
        react.createElement(CartProvider, { cart: myCart, query: `${query}\n${fragments}`, addMineCartItemApi: addMineCartItemApi },
            react.createElement(LoadingBar, null),
            react.createElement(Header, null),
            react.createElement("main", { className: "content" },
                react.createElement(common_Area, { id: "content", noOuter: true })),
            react.createElement(Footer, { copyRight: themeConfig.copyRight }))));
}
const layout = {
    areaId: 'body',
    sortOrder: 1
};
const query = `
  query Query {
    myCart {
      ...ShoppingCart
      addItemApi
      addPaymentMethodApi
      addShippingMethodApi
      addContactInfoApi
      addAddressApi
      addNoteApi
      checkoutApi
      applyCouponApi
      removeCouponApi
      availableShippingMethods {
        code
        name
        cost {
          value
          text
        }
      }
      availablePaymentMethods {
        code
        name
      }
      items {
        ...ShoppingCartItem
        cartItemId
        removeApi
        updateQtyApi
        errors
      }
    }
    customer: currentCustomer {
      customerId
      uuid
      email
      fullName
      groupId
      createdAt {
        value
        text
      }
      addAddressApi
      addresses {
        addressId
        uuid
        fullName
        telephone 
        address1
        address2
        city
        province {
          code
          name
        }
        country {
          code
          name
        }
        postcode
        isDefault
        updateApi
        deleteApi
      }
      orders {
        ...ShoppingCart
        orderId
        status {
          name
          code
          badge
        }
        orderNumber
        shipmentStatus {
          name
          code
          badge
        }
        paymentStatus {
          name
          code
          badge
        }
        items {
          ...ShoppingCartItem
          orderItemId
        }
      }
    }
    themeConfig {
      copyRight
    }
    addMineCartItemApi: url(routeId: "addMineCartItem")
    loginApi: url(routeId: "customerLoginJson")
    registerApi: url(routeId: "createCustomer")
    logoutApi: url(routeId: "customerLogoutJson")
  }
`;
const fragments = `
  fragment ShoppingCart on ShoppingCart {
    uuid
    currency
    customerId
    customerGroupId
    customerEmail
    customerFullName
    coupon
    noShippingRequired
    shippingMethod
    shippingMethodName
    paymentMethod
    paymentMethodName
    shippingNote
    taxAmount {
      value
      text
    }
    totalTaxAmount {
      value
      text
    }
    discountAmount {
      value
      text
    }
    shippingFeeExclTax {
      value
      text
    }
    shippingFeeInclTax {
      value
      text
    }
    shippingTaxAmount {
      value
      text
    }
    subTotal {
      value
      text
    }
    subTotalInclTax {
      value
      text
    }
    subTotalWithDiscount {
      value
      text
    }
    subTotalWithDiscountInclTax {
      value
      text
    }
    totalQty
    totalWeight {
      value
      unit
    }
    taxAmountBeforeDiscount {
      value
      text
    }
    grandTotal {
      value
      text
    }
    billingAddress {
      fullName
      telephone
      address1
      address2
      city
      province {
        name
        code
      }
      country {
        name
        code
      }
      postcode
    }
    shippingAddress {
      fullName
      telephone
      address1
      address2
      city
      province {
        name
        code
      }
      country {
        name
        code
      }
      postcode
    }
    createdAt {
      value
      text
    }
    updatedAt  {
      value
      text
    }
  }

  fragment ShoppingCartItem on ShoppingCartItem {
    uuid
    productId
    productSku
    productName
    thumbnail
    productWeight {
      value
      unit
    }
    productPrice {
      value
      text
    }
    productPriceInclTax {
      value
      text
    }
    qty
    finalPrice {
      value
      text
    }
    finalPriceInclTax {
      value
      text
    }
    taxPercent
    taxAmount {
      value
      text
    }
    taxAmountBeforeDiscount {
      value
      text
    }
    discountAmount {
      value
      text
    }
    lineTotal {
      value
      text
    }
    subTotal {
      value
      text
    }
    lineTotalWithDiscount {
      value
      text
    }
    lineTotalWithDiscountInclTax {
      value
      text
    }
    lineTotalInclTax {
      value
      text
    }
    total {
      value
      text
    }
    variantGroupId
    variantOptions {
      attributeCode
      attributeName
      attributeId
      optionId
      optionText
    }
    productUrl
  }
`;
//# sourceMappingURL=Base.js.map
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/merge-props/mergeProps.js
var mergeProps = __webpack_require__(10866);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/use-render/useRender.js
var useRender = __webpack_require__(92834);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/chevron-right.js
var chevron_right = __webpack_require__(87677);
;// ./node_modules/@evershop/evershop/dist/components/common/ui/Breadcrumb.js
/* unused harmony import specifier */ var Breadcrumb_cn;
/* unused harmony import specifier */ var MoreHorizontalIcon;
/* unused harmony import specifier */ var Breadcrumb_React;





function Breadcrumb({ className, ...props }) {
    return (react.createElement("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", className: cn(className), ...props }));
}
function BreadcrumbList({ className, ...props }) {
    return (react.createElement("ol", { "data-slot": "breadcrumb-list", className: cn('text-muted-foreground gap-1.5 text-sm sm:gap-2.5 flex flex-wrap items-center break-words', className), ...props }));
}
function BreadcrumbItem({ className, ...props }) {
    return (react.createElement("li", { "data-slot": "breadcrumb-item", className: cn('gap-1.5 inline-flex items-center', className), ...props }));
}
function BreadcrumbLink({ className, render, ...props }) {
    return (0,useRender/* useRender */.C)({
        defaultTagName: 'a',
        props: (0,mergeProps/* mergeProps */.v6)({
            className: cn('hover:text-foreground transition-colors', className)
        }, props),
        render,
        state: {
            slot: 'breadcrumb-link'
        }
    });
}
function BreadcrumbPage({ className, ...props }) {
    return (react.createElement("span", { "data-slot": "breadcrumb-page", role: "link", "aria-disabled": "true", "aria-current": "page", className: cn('text-foreground font-normal', className), ...props }));
}
function BreadcrumbSeparator({ children, className, ...props }) {
    return (react.createElement("li", { "data-slot": "breadcrumb-separator", role: "presentation", "aria-hidden": "true", className: cn('[&>svg]:size-3.5', className), ...props }, children !== null && children !== void 0 ? children : react.createElement(chevron_right/* default */.A, null)));
}
function BreadcrumbEllipsis({ className, ...props }) {
    return (Breadcrumb_React.createElement("span", { "data-slot": "breadcrumb-ellipsis", role: "presentation", "aria-hidden": "true", className: Breadcrumb_cn('size-5 [&>svg]:size-4 flex items-center justify-center', className), ...props },
        Breadcrumb_React.createElement(MoreHorizontalIcon, null),
        Breadcrumb_React.createElement("span", { className: "sr-only" }, "More")));
}

//# sourceMappingURL=Breadcrumb.js.map
;// ./node_modules/@evershop/evershop/dist/modules/base/pages/frontStore/all/Breadcrumb.js


function Breadcrumb_Breadcrumb({ pageInfo: { breadcrumbs } }) {
    return breadcrumbs.length ? (react.createElement("div", { className: "page-width" },
        react.createElement("div", { className: "py-5" },
            react.createElement(Breadcrumb, null,
                react.createElement(BreadcrumbList, null, breadcrumbs.map((breadcrumb, index) => (react.createElement(react.Fragment, { key: index },
                    react.createElement(BreadcrumbItem, null, index === breadcrumbs.length - 1 ? (react.createElement(BreadcrumbPage, null, breadcrumb.title)) : (react.createElement(BreadcrumbLink, { href: breadcrumb.url }, breadcrumb.title))),
                    index < breadcrumbs.length - 1 && react.createElement(BreadcrumbSeparator, null))))))))) : null;
}
const Breadcrumb_query = (/* unused pure expression or super */ null && (`
  query query {
    pageInfo {
      breadcrumbs {
        title
        url
      }
    }
  }
`));
const Breadcrumb_layout = {
    areaId: 'content',
    sortOrder: 0
};
/* harmony default export */ const all_Breadcrumb = (Breadcrumb_Breadcrumb);
//# sourceMappingURL=Breadcrumb.js.map
;// ./node_modules/@evershop/evershop/dist/modules/base/pages/frontStore/all/GlobalCss.js

function GlobalCss() {
    return null;
}
const GlobalCss_layout = {
    areaId: 'head',
    sortOrder: 5
};
//# sourceMappingURL=GlobalCss.js.map
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
;// ./node_modules/@evershop/evershop/dist/components/frontStore/Og.js


function Og({ type = 'website', title, description, image, url, siteName, publishedTime, authors, locale, alternateLocales, twitterCard = 'summary', twitterSite, twitterCreator, twitterImage, includeTwitterTags = true }) {
    return (react.createElement(react.Fragment, null,
        react.createElement(Meta, { property: "og:type", content: type }),
        title && react.createElement(Meta, { property: "og:title", content: title }),
        description && react.createElement(Meta, { property: "og:description", content: description }),
        image && react.createElement(Meta, { property: "og:image", content: image }),
        url && react.createElement(Meta, { property: "og:url", content: url }),
        siteName && react.createElement(Meta, { property: "og:site_name", content: siteName }),
        type === 'article' && publishedTime && (react.createElement(Meta, { property: "article:published_time", content: publishedTime })),
        type === 'article' &&
            (authors === null || authors === void 0 ? void 0 : authors.length) &&
            authors.map((author, index) => (react.createElement(Meta, { key: `author-${index}`, property: "article:author", content: author }))),
        locale && react.createElement(Meta, { property: "og:locale", content: locale }),
        (alternateLocales === null || alternateLocales === void 0 ? void 0 : alternateLocales.length) &&
            alternateLocales.map((alternateLocale, index) => (react.createElement(Meta, { key: `locale-${index}`, property: "og:locale:alternate", content: alternateLocale }))),
        includeTwitterTags && (react.createElement(react.Fragment, null,
            react.createElement(Meta, { name: "twitter:card", content: twitterCard }),
            title && react.createElement(Meta, { name: "twitter:title", content: title }),
            description && (react.createElement(Meta, { name: "twitter:description", content: description })),
            twitterSite && react.createElement(Meta, { name: "twitter:site", content: twitterSite }),
            twitterCreator && (react.createElement(Meta, { name: "twitter:creator", content: twitterCreator })),
            twitterImage && react.createElement(Meta, { name: "twitter:image", content: twitterImage })))));
}
//# sourceMappingURL=Og.js.map
;// ./node_modules/@evershop/evershop/dist/modules/base/pages/frontStore/all/HeadTags.js


function HeadTags({ pageInfo: { title, description, keywords, canonicalUrl, ogInfo, favicon }, themeConfig: { headTags: { metas, links, scripts, base } } }) {
    react.useEffect(() => {
        const head = document.querySelector('head');
        scripts.forEach((script) => {
            const scriptElement = document.createElement('script');
            Object.keys(script).forEach((key) => {
                if (script[key]) {
                    scriptElement[key] = script[key];
                }
            });
            head === null || head === void 0 ? void 0 : head.appendChild(scriptElement);
        });
    }, []);
    return (react.createElement(react.Fragment, null,
        react.createElement("title", null, title),
        react.createElement("meta", { name: "description", content: description }),
        react.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
        metas.map((meta, index) => (react.createElement("meta", { key: index, ...meta }))),
        links.map((link, index) => (react.createElement("link", { key: index, ...link }))),
        scripts.map((script, index) => (react.createElement("script", { key: index, ...script }))),
        favicon && react.createElement("link", { rel: "icon", href: favicon }),
        keywords && keywords.length > 0 && (react.createElement("meta", { name: "keywords", content: keywords.join(', ') })),
        canonicalUrl && react.createElement("link", { rel: "canonical", href: canonicalUrl }),
        base && react.createElement("base", { ...base }),
        react.createElement(Og, { type: ogInfo.type, title: title, description: description, url: ogInfo.url, siteName: ogInfo.siteName, image: ogInfo.image, locale: ogInfo.locale, twitterCard: ogInfo.twitterCard, twitterSite: ogInfo.twitterSite, twitterCreator: ogInfo.twitterCreator, twitterImage: ogInfo.twitterImage })));
}
const HeadTags_layout = {
    areaId: 'head',
    sortOrder: 5
};
const HeadTags_query = (/* unused pure expression or super */ null && (`
  query query {
    pageInfo {
      title
      description
      keywords
      canonicalUrl
      favicon
      ogInfo {
        locale
        title
        description
        image
        url
        type
        siteName
        twitterCard
        twitterSite
        twitterCreator
        twitterImage
      }
    }
    themeConfig {
      headTags {
        metas {
          name
          content
          charSet
          httpEquiv
          property
          itemProp
          itemType
          itemID
          lang
        }
        links {
          rel
          href
          sizes
          type
          hrefLang
          media
          title
          as
          crossOrigin
          integrity
          referrerPolicy
        }
        scripts {
          src
          type
          async
          defer
          crossOrigin
          integrity
          noModule
          nonce
        }
        base {
          href
          target
        }
      }
    }
  }
`));
//# sourceMappingURL=HeadTags.js.map
;// ./node_modules/@evershop/evershop/dist/modules/base/pages/frontStore/all/Logo.js

function Logo({ themeConfig: { logo: { src, alt = 'Evershop', width = 128, height = 128 } } }) {
    return (react.createElement("div", { className: "logo md:ml-0 flex justify-center items-center" },
        src && (react.createElement("a", { href: "/", className: "logo-icon" },
            react.createElement("img", { src: src, alt: alt, width: width, height: height }))),
        !src && (react.createElement("a", { href: "/", className: "logo-icon" },
            react.createElement("svg", { width: "128", height: "146", viewBox: "0 0 128 146", fill: "none", className: "w-10 h-10", xmlns: "http://www.w3.org/2000/svg" },
                react.createElement("path", { d: "M32.388 18.0772L1.15175 36.1544L1.05206 72.5081L0.985596 108.895L32.4213 127.039C49.7009 137.008 63.9567 145.182 64.1228 145.182C64.289 145.182 72.8956 140.264 83.2966 134.283C93.6644 128.268 107.82 120.127 114.732 116.139L127.26 108.895V101.119V93.3102L126.529 93.7089C126.097 93.9415 111.941 102.083 95.06 111.853C78.1459 121.622 64.156 129.531 63.9567 129.498C63.724 129.431 52.5587 123.051 39.1005 115.275L14.6099 101.152V72.5746V43.9967L25.6756 37.6165C31.7234 34.1274 42.8223 27.7472 50.2991 23.4273C57.7426 19.1073 63.9899 15.585 64.1228 15.585C64.2557 15.585 72.9288 20.5362 83.3963 26.5841L113.902 43.9967L118.713 41.1657L127.26 36.1544L113.902 28.5447C103.334 22.2974 64.3554 -0.033191 64.0231 3.90721e-05C63.8237 3.90721e-05 49.568 8.14142 32.388 18.0772Z", fill: "#1F1F1F" }),
                react.createElement("path", { d: "M96.0237 54.1983C78.9434 64.0677 64.721 72.2423 64.4219 72.3088C64.0896 72.4084 55.7488 67.7562 44.8826 61.509L25.9082 50.543V58.4186L25.9414 66.2609L44.3841 76.8945C54.5193 82.743 63.1591 87.6611 63.5911 87.8272C64.2557 88.0598 68.9079 85.5011 95.5585 70.1156C112.705 60.1798 126.861 51.9719 127.027 51.839C127.16 51.7061 127.227 48.1505 127.194 43.9302L127.094 36.2541L96.0237 54.1983Z", fill: "#1F1F1F" }),
                react.createElement("path", { d: "M123.771 66.7261C121.943 67.7562 107.854 75.8976 92.4349 84.8033C77.0161 93.7089 64.289 100.986 64.1228 100.986C63.9567 100.986 55.3501 96.0683 44.9491 90.0869L26.0744 79.1874L25.9747 86.8303C25.9082 92.6788 26.0079 94.5729 26.307 94.872C26.9383 95.4369 63.7241 116.604 64.1228 116.604C64.4551 116.604 126.496 80.8821 127.027 80.4169C127.16 80.284 127.227 76.7284 127.194 72.4749L127.094 64.7987L123.771 66.7261Z", fill: "#1F1F1F" }))))));
}
const Logo_layout = {
    areaId: 'headerMiddleCenter',
    sortOrder: 10
};
const Logo_query = (/* unused pure expression or super */ null && (`
  query query {
    themeConfig {
      logo {
        src
        alt
        width
        height
      }
    }
  }
`));
//# sourceMappingURL=Logo.js.map
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
// EXTERNAL MODULE: ./node_modules/react-toastify/dist/react-toastify.esm.js + 6 modules
var react_toastify_esm = __webpack_require__(64718);
;// ./node_modules/@evershop/evershop/dist/modules/base/pages/frontStore/all/Notification.js





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
;// ./node_modules/@evershop/evershop/dist/modules/base/pages/frontStore/all/TailwindCss.js

function TailwindCss() {
    return null;
}
const TailwindCss_layout = {
    areaId: 'head',
    sortOrder: 1
};
//# sourceMappingURL=TailwindCss.js.map
;// ./node_modules/@evershop/evershop/dist/lib/util/parseImageSizes.js
// Define your desired image breakpoints. Consider putting this in a config file.
const deviceSizes = [320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const isValidCondition = (condition) => {
    if (!condition || typeof condition !== 'string') {
        return false;
    }
    const trimmed = condition.trim();
    if (!trimmed) {
        return false;
    }
    // Special case: handle 'auto' keyword
    if (trimmed === 'auto') {
        return true;
    }
    // Check for valid CSS units pattern - allow some whitespace between value and unit
    const validUnitsPattern = /(\d+(?:\.\d+)?)\s*(vw|vh|px|rem|em|%|ch|vmin|vmax|pt|pc|in|cm|mm|ex|ic|lh|vi|vb|cqw|cqh|cqi|cqb|cqmin|cqmax)\s*$/;
    // If it has parentheses, it should be a media query
    if (trimmed.includes('(')) {
        // Basic media query validation - must have closing parenthesis and valid value
        const hasClosingParen = trimmed.includes(')');
        const hasValidValue = validUnitsPattern.test(trimmed);
        // Also check that it has proper media query structure
        const hasProperMediaQuery = /\([^)]*\)/.test(trimmed);
        return hasClosingParen && hasValidValue && hasProperMediaQuery;
    }
    else {
        // Simple value without media query - but shouldn't have unmatched closing parenthesis
        const hasUnmatchedClosingParen = trimmed.includes(')');
        const hasValidValue = validUnitsPattern.test(trimmed);
        return !hasUnmatchedClosingParen && hasValidValue;
    }
};
// Parse sizes string to estimate actual image sizes
const parseImageSizes = (sizes) => {
    // Validate input
    if (!sizes || typeof sizes !== 'string') {
        throw new Error('Invalid sizes attribute: must be a non-empty string');
    }
    const trimmedSizes = sizes.trim();
    if (!trimmedSizes) {
        throw new Error('Invalid sizes attribute: cannot be empty or whitespace only');
    }
    // Handle fixed pixel values first
    if (trimmedSizes.endsWith('px') &&
        !trimmedSizes.includes(',') &&
        !trimmedSizes.includes('(')) {
        const pixelValue = parseInt(trimmedSizes);
        if (!isNaN(pixelValue) && pixelValue > 0) {
            // For fixed pixel values, generate a few sizes around that value
            return deviceSizes
                .filter((size) => size >= pixelValue * 0.5) // Include smaller sizes for efficiency
                .slice(0, 4); // Limit to 4 sizes to keep srcset reasonable
        }
        else {
            throw new Error(`Invalid pixel value in sizes attribute: "${trimmedSizes}" must be a positive number followed by "px"`);
        }
    }
    // Parse complex sizes string with media queries
    const conditions = trimmedSizes
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    if (conditions.length === 0) {
        throw new Error('Invalid sizes attribute: no valid conditions found after parsing');
    }
    // Validate that each condition has a proper format
    for (const condition of conditions) {
        if (!isValidCondition(condition)) {
            throw new Error(`Invalid condition in sizes attribute: "${condition}" - must contain a valid CSS length value or media query`);
        }
    }
    // For each device size, determine what actual image size would be used
    const imageSizes = deviceSizes.map((deviceSize) => {
        // Go through conditions in order until we find a match
        for (const condition of conditions) {
            const result = evaluateCondition(condition, deviceSize);
            if (result !== null) {
                return result;
            }
        }
        // If no conditions matched, assume full width
        return deviceSize;
    });
    // Remove duplicates, sort, and ensure we have reasonable variety
    const uniqueSizes = [...new Set(imageSizes)].sort((a, b) => a - b);
    // Ensure minimum variety for better responsive behavior
    if (uniqueSizes.length < 3) {
        // Add some intermediate sizes for better coverage
        const minSize = Math.min(...uniqueSizes);
        const maxSize = Math.max(...uniqueSizes);
        const midSize = Math.round((minSize + maxSize) / 2);
        uniqueSizes.push(midSize);
    }
    return [...new Set(uniqueSizes)].sort((a, b) => a - b);
};
const evaluateCondition = (condition, deviceSize) => {
    // Remove extra whitespace
    condition = condition.trim();
    // Check if this condition has a media query
    if (condition.includes('(')) {
        // Extract media query and value parts - comprehensive regex for all CSS units
        const mediaQueryMatch = condition.match(/\(([^)]+)\)/g);
        const valueMatch = condition.match(/(\d+(?:\.\d+)?)\s*(vw|vh|px|rem|em|%|ch|vmin|vmax|pt|pc|in|cm|mm|ex|ic|lh|vi|vb|cqw|cqh|cqi|cqb|cqmin|cqmax)\s*$/);
        if (!mediaQueryMatch || !valueMatch) {
            return null;
        }
        const mediaQueries = mediaQueryMatch.map((mq) => mq.slice(1, -1)); // Remove parentheses
        const value = parseFloat(valueMatch[1]);
        const unit = valueMatch[2];
        // Check if all media queries match for this device size
        const allMatch = mediaQueries.every((mq) => {
            const matches = evaluateMediaQuery(mq, deviceSize);
            return matches;
        });
        if (allMatch) {
            const result = convertToPixels(value, unit, deviceSize);
            return result;
        }
        return null; // Media query doesn't match
    }
    else {
        // Special case: handle 'auto' keyword
        if (condition.trim() === 'auto') {
            // For 'auto', use a reasonable default based on the device size
            // We'll use 25% of the viewport width as a reasonable approximation
            return Math.round(deviceSize * 0.25);
        }
        // No media query, this is a fallback value - comprehensive regex for all CSS units
        const valueMatch = condition.match(/(\d+(?:\.\d+)?)\s*(vw|vh|px|rem|em|%|ch|vmin|vmax|pt|pc|in|cm|mm|ex|ic|lh|vi|vb|cqw|cqh|cqi|cqb|cqmin|cqmax)\s*$/);
        if (valueMatch) {
            const value = parseFloat(valueMatch[1]);
            const unit = valueMatch[2];
            const result = convertToPixels(value, unit, deviceSize);
            return result;
        }
    }
    return null;
};
const evaluateMediaQuery = (mediaQuery, deviceSize) => {
    var _a, _b, _c, _d;
    // Handle different media query types with improved regex patterns
    if (mediaQuery.includes('max-width')) {
        const maxWidth = parseFloat(((_a = mediaQuery.match(/max-width\s*:\s*(\d+(?:\.\d+)?)px/)) === null || _a === void 0 ? void 0 : _a[1]) || '0');
        return deviceSize <= maxWidth;
    }
    if (mediaQuery.includes('min-width')) {
        const minWidth = parseFloat(((_b = mediaQuery.match(/min-width\s*:\s*(\d+(?:\.\d+)?)px/)) === null || _b === void 0 ? void 0 : _b[1]) || '0');
        return deviceSize >= minWidth;
    }
    if (mediaQuery.includes('max-device-width')) {
        const maxDeviceWidth = parseFloat(((_c = mediaQuery.match(/max-device-width\s*:\s*(\d+(?:\.\d+)?)px/)) === null || _c === void 0 ? void 0 : _c[1]) || '0');
        return deviceSize <= maxDeviceWidth;
    }
    if (mediaQuery.includes('min-device-width')) {
        const minDeviceWidth = parseFloat(((_d = mediaQuery.match(/min-device-width\s*:\s*(\d+(?:\.\d+)?)px/)) === null || _d === void 0 ? void 0 : _d[1]) || '0');
        return deviceSize >= minDeviceWidth;
    }
    // Handle orientation
    if (mediaQuery.includes('orientation')) {
        if (mediaQuery.includes('landscape')) {
            return deviceSize >= 768; // Assume landscape for wider screens
        }
        if (mediaQuery.includes('portrait')) {
            return deviceSize < 768; // Assume portrait for narrower screens
        }
    }
    // Handle aspect-ratio (simplified)
    if (mediaQuery.includes('aspect-ratio')) {
        // For simplicity, assume most common aspect ratios match
        return true;
    }
    // Handle resolution/pixel density
    if (mediaQuery.includes('resolution') ||
        mediaQuery.includes('-webkit-device-pixel-ratio')) {
        // For srcset calculation, we generally assume 2x displays are common
        return true;
    }
    // Handle prefers-color-scheme, prefers-reduced-motion etc.
    if (mediaQuery.includes('prefers-')) {
        // These don't affect image sizing, so return true
        return true;
    }
    // Default: if we can't parse it, assume it matches
    return true;
};
const convertToPixels = (value, unit, deviceSize) => {
    switch (unit) {
        // Viewport units
        case 'vw':
            return Math.round((deviceSize * value) / 100);
        case 'vh':
            // Assume viewport height is roughly 1.5x viewport width for mobile, 0.6x for desktop
            const assumedHeight = deviceSize <= 768 ? deviceSize * 1.5 : deviceSize * 0.6;
            return Math.round((assumedHeight * value) / 100);
        case 'vmin':
            // vmin is the smaller of vw or vh
            const vminHeight = deviceSize <= 768 ? deviceSize * 1.5 : deviceSize * 0.6;
            const minDimension = Math.min(deviceSize, vminHeight);
            return Math.round((minDimension * value) / 100);
        case 'vmax':
            // vmax is the larger of vw or vh
            const vmaxHeight = deviceSize <= 768 ? deviceSize * 1.5 : deviceSize * 0.6;
            const maxDimension = Math.max(deviceSize, vmaxHeight);
            return Math.round((maxDimension * value) / 100);
        case 'vi':
            // Viewport inline (same as vw in horizontal writing mode)
            return Math.round((deviceSize * value) / 100);
        case 'vb':
            // Viewport block (same as vh in horizontal writing mode)
            const vbHeight = deviceSize <= 768 ? deviceSize * 1.5 : deviceSize * 0.6;
            return Math.round((vbHeight * value) / 100);
        // Absolute length units
        case 'px':
            return Math.round(value);
        case 'pt':
            // 1pt = 1.33px (approximately)
            return Math.round(value * 1.33);
        case 'pc':
            // 1pc = 16px (1 pica = 12 points)
            return Math.round(value * 16);
        case 'in':
            // 1in = 96px (CSS reference pixel)
            return Math.round(value * 96);
        case 'cm':
            // 1cm = 37.8px (96px/2.54)
            return Math.round(value * 37.8);
        case 'mm':
            // 1mm = 3.78px (37.8px/10)
            return Math.round(value * 3.78);
        // Relative length units
        case '%':
            // Assume % is relative to viewport width (same as vw in most contexts)
            return Math.round((deviceSize * value) / 100);
        case 'rem':
            // Assume 1rem = 16px (default browser font size)
            return Math.round(value * 16);
        case 'em':
            // Assume 1em = 16px (in absence of parent context)
            return Math.round(value * 16);
        case 'ex':
            // Assume 1ex = 8px (approximately 0.5em)
            return Math.round(value * 8);
        case 'ch':
            // Assume 1ch = 8px (approximate character width in monospace font)
            return Math.round(value * 8);
        case 'ic':
            // Assume 1ic = 16px (ideographic character width, similar to em)
            return Math.round(value * 16);
        case 'lh':
            // Assume 1lh = 24px (typical line height is 1.5em)
            return Math.round(value * 24);
        // Container query units (treat similar to viewport units for now)
        case 'cqw':
            // Container query width (fallback to viewport width)
            return Math.round((deviceSize * value) / 100);
        case 'cqh':
            // Container query height (fallback to viewport height)
            const cqhHeight = deviceSize <= 768 ? deviceSize * 1.5 : deviceSize * 0.6;
            return Math.round((cqhHeight * value) / 100);
        case 'cqi':
            // Container query inline (fallback to viewport width)
            return Math.round((deviceSize * value) / 100);
        case 'cqb':
            // Container query block (fallback to viewport height)
            const cqbHeight = deviceSize <= 768 ? deviceSize * 1.5 : deviceSize * 0.6;
            return Math.round((cqbHeight * value) / 100);
        case 'cqmin':
            // Container query min (fallback to vmin)
            const cqminHeight = deviceSize <= 768 ? deviceSize * 1.5 : deviceSize * 0.6;
            const cqMinDimension = Math.min(deviceSize, cqminHeight);
            return Math.round((cqMinDimension * value) / 100);
        case 'cqmax':
            // Container query max (fallback to vmax)
            const cqmaxHeight = deviceSize <= 768 ? deviceSize * 1.5 : deviceSize * 0.6;
            const cqMaxDimension = Math.max(deviceSize, cqmaxHeight);
            return Math.round((cqMaxDimension * value) / 100);
        default:
            // Fallback to treating as pixels
            return Math.round(value);
    }
};
//# sourceMappingURL=parseImageSizes.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/Image.js


function Image({ src, width, height, alt, quality = 75, loading = 'eager', decoding = 'async', priority = false, sizes = '100vw', objectFit = 'unset', ...props }) {
    const generateSrcSet = () => {
        const imageSizes = parseImageSizes(sizes);
        // Don't upscale beyond 3 times the original width, but be smarter about filtering
        let filteredSizes = imageSizes.filter((size) => size <= width * 3);
        if (filteredSizes.length < 2) {
            // Add the original width
            filteredSizes.push(width);
            const smallerSizes = [
                Math.round(width * 0.5), // 50% of original
                Math.round(width * 0.75) // 75% of original
            ].filter((size) => size >= 200 && !filteredSizes.includes(size)); // Don't go too small
            filteredSizes = [...filteredSizes, ...smallerSizes];
        }
        if (!filteredSizes.includes(width)) {
            filteredSizes.push(width);
        }
        filteredSizes = [...new Set(filteredSizes)].sort((a, b) => a - b);
        return filteredSizes
            .map((size) => {
            // Construct the URL pointing to our image API
            const url = `/images?src=${encodeURIComponent(src)}&w=${size}&q=${quality}`;
            return `${url} ${size}w`;
        })
            .join(', ');
    };
    const srcset = generateSrcSet();
    const fallbackSrc = `/images?src=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
    // Prepare the base style with responsive behavior
    const baseStyle = {
        // Modern responsive image approach
        maxWidth: '100%', // Ensure image doesn't exceed its container
        height: 'auto', // Maintain aspect ratio
        objectFit: objectFit,
        aspectRatio: `${width} / ${height}` // Maintain aspect ratio
    };
    return (react.createElement("img", { ...props, src: fallbackSrc, srcSet: srcset, sizes: sizes, alt: alt, 
        // Set intrinsic dimensions to help browser calculate aspect ratio
        width: width, height: height, style: {
            ...baseStyle,
            ...props.style
        }, loading: loading, decoding: decoding, itemProp: priority ? 'preload' : undefined }));
}
//# sourceMappingURL=Image.js.map
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
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/x.js
var x = __webpack_require__(48697);
;// ./node_modules/@evershop/evershop/dist/components/frontStore/catalog/SearchBox.js






const SEARCH_PRODUCTS_QUERY = `
  query Query($filters: [FilterInput]) {
    products(filters: $filters) {
      items {
        ...Product
      }
    }
  }
`;
const PRODUCT_FRAGMENT = `
  fragment Product on Product {
    productId
    name
    sku
    price {
      regular {
        value
        text
      }
      special {
        value
        text
      }
    }
    image {
      url
      alt
    }
    url
    inventory {
      isInStock
    }
  }
`;
function SearchBox({ searchPageUrl, enableAutocomplete = false, autocompleteDelay = 300, minSearchLength = 2, maxResults = 10, onSearch, renderSearchInput, renderSearchResults, renderSearchIcon, renderCloseIcon }) {
    const InputRef = (0,react.useRef)(null);
    const searchTimeoutRef = (0,react.useRef)(null);
    const client = (0,urql_es/* useClient */.tH)();
    const [keyword, setKeyword] = (0,react.useState)('');
    const [showing, setShowing] = (0,react.useState)(false);
    const [searchResults, setSearchResults] = (0,react.useState)([]);
    const [isSearching, setIsSearching] = (0,react.useState)(false);
    const [showResults, setShowResults] = (0,react.useState)(false);
    const defaultSearchFunction = (0,react.useCallback)(async (query) => {
        var _a, _b;
        try {
            const result = await client
                .query(`
            ${PRODUCT_FRAGMENT}
            ${SEARCH_PRODUCTS_QUERY}
          `, {
                filters: [
                    {
                        key: 'keyword',
                        operation: 'eq',
                        value: query
                    },
                    {
                        key: 'limit',
                        operation: 'eq',
                        value: `${maxResults}`
                    }
                ]
            })
                .toPromise();
            if (result.error) {
                return [];
            }
            if (!((_b = (_a = result.data) === null || _a === void 0 ? void 0 : _a.products) === null || _b === void 0 ? void 0 : _b.items)) {
                return [];
            }
            return result.data.products.items.map((product) => {
                var _a, _b, _c, _d, _e, _f;
                return ({
                    id: product.productId,
                    title: product.name,
                    url: product.url,
                    image: (_a = product.image) === null || _a === void 0 ? void 0 : _a.url,
                    price: ((_c = (_b = product.price) === null || _b === void 0 ? void 0 : _b.special) === null || _c === void 0 ? void 0 : _c.text) || ((_e = (_d = product.price) === null || _d === void 0 ? void 0 : _d.regular) === null || _e === void 0 ? void 0 : _e.text),
                    type: 'product',
                    sku: product.sku,
                    isInStock: (_f = product.inventory) === null || _f === void 0 ? void 0 : _f.isInStock
                });
            });
        }
        catch (error) {
            return [];
        }
    }, [client]);
    const searchFunction = onSearch || defaultSearchFunction;
    react.useEffect(() => {
        const url = new URL(window.location.href);
        const key = url.searchParams.get('keyword');
        setKeyword(key || '');
    }, []);
    react.useEffect(() => {
        var _a;
        if (showing) {
            (_a = InputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }, [showing]);
    const performSearch = (0,react.useCallback)(async (query) => {
        if (!enableAutocomplete || query.length < minSearchLength) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }
        setIsSearching(true);
        try {
            const results = await searchFunction(query);
            setSearchResults(results.slice(0, maxResults));
            setShowResults(true);
        }
        catch (error) {
            setSearchResults([]);
        }
        finally {
            setIsSearching(false);
        }
    }, [enableAutocomplete, searchFunction, minSearchLength, maxResults]);
    const handleInputChange = (0,react.useCallback)((value) => {
        setKeyword(value);
        if (enableAutocomplete) {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
            searchTimeoutRef.current = setTimeout(() => {
                performSearch(value);
            }, autocompleteDelay);
        }
    }, [enableAutocomplete, autocompleteDelay, performSearch]);
    const handleResultSelect = (0,react.useCallback)((result) => {
        if (result.url) {
            window.location.href = result.url;
        }
        else {
            const url = new URL(searchPageUrl, window.location.origin);
            url.searchParams.set('keyword', result.title);
            window.location.href = url.toString();
        }
        setShowing(false);
        setShowResults(false);
    }, [searchPageUrl]);
    const handleKeyDown = (0,react.useCallback)((event) => {
        if (event.key === 'Enter') {
            setShowResults(false);
            const url = new URL(searchPageUrl, window.location.origin);
            url.searchParams.set('keyword', keyword);
            window.location.href = url.toString();
        }
        else if (event.key === 'Escape') {
            setShowResults(false);
            setShowing(false);
        }
    }, [searchPageUrl, keyword]);
    const handleFocus = (0,react.useCallback)(() => {
        if (enableAutocomplete &&
            keyword.length >= minSearchLength &&
            searchResults.length > 0) {
            setShowResults(true);
        }
    }, [enableAutocomplete, keyword, minSearchLength, searchResults.length]);
    const handleBlur = (0,react.useCallback)(() => {
        setTimeout(() => {
            setShowResults(false);
        }, 150);
    }, []);
    const defaultSearchIcon = () => (react.createElement(search/* default */.A, { className: "w-5 h-5 text-foreground hover:text-primary" }));
    const defaultCloseIcon = () => (react.createElement(x/* default */.A, { className: "w-5 h-5 text-foreground hover:text-primary" }));
    return (react.createElement("div", { className: "search__box" },
        react.createElement("a", { href: "#", className: "search__icon", onClick: (e) => {
                e.preventDefault();
                setShowing(!showing);
            } }, renderSearchIcon ? renderSearchIcon() : defaultSearchIcon()),
        showing && (react.createElement("div", { className: "search__input__container fixed top-0 left-0 right-0 bottom-0 bg-white shadow-md z-50 p-10" },
            react.createElement("div", { className: "search__input relative flex justify-between" },
                renderSearchInput
                    ? renderSearchInput({
                        value: keyword || '',
                        onChange: handleInputChange,
                        onKeyDown: handleKeyDown,
                        onFocus: handleFocus,
                        onBlur: handleBlur,
                        placeholder: _('Search'),
                        ref: InputRef
                    })
                    : defaultSearchInput({
                        value: keyword || '',
                        onChange: handleInputChange,
                        onKeyDown: handleKeyDown,
                        onFocus: handleFocus,
                        onBlur: handleBlur,
                        placeholder: _('Search'),
                        ref: InputRef
                    }),
                react.createElement("a", { href: "#", className: "close-icon flex items-center p-3", onClick: (e) => {
                        e.preventDefault();
                        setShowing(false);
                        setShowResults(false);
                    } }, renderCloseIcon ? renderCloseIcon() : defaultCloseIcon()),
                enableAutocomplete &&
                    showResults &&
                    (renderSearchResults
                        ? renderSearchResults({
                            results: searchResults,
                            query: keyword || '',
                            onSelect: handleResultSelect,
                            isLoading: isSearching
                        })
                        : defaultSearchResults({
                            results: searchResults,
                            query: keyword || '',
                            onSelect: handleResultSelect,
                            isLoading: isSearching
                        })))))));
}
const defaultSearchInput = (props) => (react.createElement("div", { className: "form__field flex items-center justify-center relative grow" },
    react.createElement(InputGroup, null,
        react.createElement(InputGroupAddon, null,
            react.createElement(search/* default */.A, null)),
        react.createElement(InputGroupInput, { ref: props.ref, placeholder: props.placeholder, value: props.value, onChange: (e) => props.onChange(e.target.value), onKeyDown: props.onKeyDown, onFocus: props.onFocus, onBlur: props.onBlur, enterKeyHint: "done", className: "w-full focus:outline-none" }))));
const defaultSearchResults = (props) => {
    return (react.createElement("div", { className: "search__results absolute top-full left-0 right-0 bg-white border border-border rounded-b-lg shadow-lg z-50 max-h-64 overflow-y-auto" },
        props.isLoading && (react.createElement("div", { className: "p-3 text-center text-gray-500" },
            react.createElement("span", null, "Searching..."))),
        !props.isLoading && props.results.length === 0 && (react.createElement("div", { className: "p-3 text-center text-gray-500" },
            react.createElement("span", null,
                "No results found for \u201C",
                props.query,
                "\u201D"))),
        !props.isLoading &&
            props.results.map((result) => (react.createElement("div", { key: result.id, className: "flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-border last:border-b-0", onClick: (e) => {
                    e.preventDefault();
                    props.onSelect(result);
                }, onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        props.onSelect(result);
                    }
                }, role: "button", tabIndex: 0 },
                result.image && (react.createElement(Image, { src: result.image, alt: result.title, width: 100, height: 100, className: "w-10 h-10 object-cover rounded mr-3 shrink-0" })),
                react.createElement("div", { className: "flex-1 min-w-0" },
                    react.createElement("div", { className: "font-medium truncate" }, result.title),
                    result.price && react.createElement("div", { className: "text-sm" }, result.price),
                    result.type && (react.createElement("div", { className: "text-xs text-gray-400 capitalize" }, result.type))))))));
};
//# sourceMappingURL=SearchBox.js.map
;// ./node_modules/@evershop/evershop/dist/modules/catalog/pages/frontStore/all/SearchBox.js


function SearchBox_SearchBox({ searchPageUrl }) {
    return (react.createElement(SearchBox, { searchPageUrl: searchPageUrl, enableAutocomplete: true, maxResults: 10 }));
}
const SearchBox_layout = {
    areaId: 'headerMiddleRight',
    sortOrder: 5
};
const SearchBox_query = (/* unused pure expression or super */ null && (`
  query Query {
    searchPageUrl: url(routeId: "catalogSearch")
  }
`));
//# sourceMappingURL=SearchBox.js.map
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/dialog/root/DialogRoot.js + 2 modules
var DialogRoot = __webpack_require__(30523);
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
;// ./node_modules/@evershop/evershop/dist/components/common/ui/Sheet.js
/* unused harmony import specifier */ var SheetPrimitive;
/* unused harmony import specifier */ var Sheet_cn;
/* unused harmony import specifier */ var Sheet_React;





function Sheet({ ...props }) {
    return react.createElement(DialogRoot/* DialogRoot */.D, { "data-slot": "sheet", ...props });
}
function SheetTrigger({ ...props }) {
    return Sheet_React.createElement(SheetPrimitive.Trigger, { "data-slot": "sheet-trigger", ...props });
}
function SheetClose({ ...props }) {
    return Sheet_React.createElement(SheetPrimitive.Close, { "data-slot": "sheet-close", ...props });
}
function SheetPortal({ ...props }) {
    return react.createElement(DialogPortal/* DialogPortal */.Z, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({ className, ...props }) {
    return (react.createElement(DialogBackdrop/* DialogBackdrop */.X, { "data-slot": "sheet-overlay", className: cn('data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 duration-100 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 z-50', className), ...props }));
}
function SheetContent({ className, children, side = 'right', showCloseButton = true, ...props }) {
    return (react.createElement(SheetPortal, null,
        react.createElement(SheetOverlay, null),
        react.createElement(DialogPopup/* DialogPopup */.h, { "data-slot": "sheet-content", "data-side": side, className: cn('bg-background data-open:animate-in data-closed:animate-out data-[side=right]:data-closed:slide-out-to-right-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=top]:data-closed:slide-out-to-top-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:fade-out-0 data-open:fade-in-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=bottom]:data-open:slide-in-from-bottom-10 fixed z-50 flex flex-col gap-4 bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm', className), ...props },
            children,
            showCloseButton && (react.createElement(DialogClose/* DialogClose */.H, { "data-slot": "sheet-close", render: react.createElement(Button_Button, { variant: "ghost", className: "absolute top-4 right-4", size: "icon-sm" }) },
                react.createElement(x/* default */.A, null),
                react.createElement("span", { className: "sr-only" }, "Close"))))));
}
function SheetHeader({ className, ...props }) {
    return (react.createElement("div", { "data-slot": "sheet-header", className: cn('gap-1.5 p-4 flex flex-col', className), ...props }));
}
function SheetFooter({ className, ...props }) {
    return (Sheet_React.createElement("div", { "data-slot": "sheet-footer", className: Sheet_cn('gap-2 p-4 mt-auto flex flex-col', className), ...props }));
}
function SheetTitle({ className, ...props }) {
    return (react.createElement(DialogTitle/* DialogTitle */.L, { "data-slot": "sheet-title", className: cn('text-foreground font-medium', className), ...props }));
}
function SheetDescription({ className, ...props }) {
    return (Sheet_React.createElement(SheetPrimitive.Description, { "data-slot": "sheet-description", className: Sheet_cn('text-muted-foreground text-sm', className), ...props }));
}

//# sourceMappingURL=Sheet.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/cart/CartItems.js




function CartItems({ children }) {
    const { data: cart, loading } = useCartState();
    const { config: { tax: { priceIncludingTax } } } = useAppState();
    const { removeItem } = useCartDispatch();
    const isEmpty = (cart === null || cart === void 0 ? void 0 : cart.totalQty) === 0;
    const totalItems = (cart === null || cart === void 0 ? void 0 : cart.totalQty) || 0;
    const handleRemoveItem = async (itemId) => {
        await removeItem(itemId);
    };
    return (react.createElement("div", { className: "cart-items" },
        react.createElement(common_Area, { id: "cartItemsBefore", noOuter: true }),
        children
            ? children({
                items: (cart === null || cart === void 0 ? void 0 : cart.items) || [],
                showPriceIncludingTax: priceIncludingTax,
                loading,
                isEmpty,
                totalItems,
                onRemoveItem: handleRemoveItem
            })
            : null,
        react.createElement(common_Area, { id: "cartItemsAfter", noOuter: true })));
}

//# sourceMappingURL=CartItems.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/ui/Skeleton.js


function Skeleton({ className, ...props }) {
    return (react.createElement("div", { "data-slot": "skeleton", className: cn('bg-muted rounded-md animate-pulse', className), ...props }));
}

//# sourceMappingURL=Skeleton.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/Coupon.js



const Coupon = ({ onApplySuccess, onRemoveSuccess, onError, children }) => {
    var _a, _b;
    const cartDispatch = useCartDispatch();
    const cartState = useCartState();
    const [localError, setLocalError] = (0,react.useState)(null);
    const appliedCoupon = ((_a = cartState.data) === null || _a === void 0 ? void 0 : _a.coupon) || null;
    const hasActiveCoupon = !!appliedCoupon && appliedCoupon.trim() !== '';
    const canApplyCoupon = !!cartState.data && !hasActiveCoupon;
    const canRemoveCoupon = !!cartState.data && hasActiveCoupon;
    const isLoading = cartState.loading;
    const clearError = (0,react.useCallback)(() => {
        setLocalError(null);
        cartDispatch.clearError();
    }, [cartDispatch]);
    const applyCoupon = (0,react.useCallback)(async (code) => {
        if (!canApplyCoupon || !code.trim()) {
            const errorMsg = !cartState.data
                ? _('Cart is not initialized')
                : hasActiveCoupon
                    ? _('A coupon is already applied')
                    : _('Please enter a coupon code');
            setLocalError(errorMsg);
            onError === null || onError === void 0 ? void 0 : onError(errorMsg);
            return;
        }
        try {
            setLocalError(null);
            cartDispatch.clearError();
            await cartDispatch.applyCoupon(code.trim());
            onApplySuccess === null || onApplySuccess === void 0 ? void 0 : onApplySuccess(code.trim());
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : _('Failed to apply coupon');
            setLocalError(errorMessage);
            onError === null || onError === void 0 ? void 0 : onError(errorMessage);
        }
    }, [
        canApplyCoupon,
        cartState.data,
        hasActiveCoupon,
        cartDispatch,
        onApplySuccess,
        onError
    ]);
    const removeCoupon = (0,react.useCallback)(async () => {
        if (!canRemoveCoupon) {
            const errorMsg = !cartState.data
                ? _('Cart is not initialized')
                : _('No coupon to remove');
            setLocalError(errorMsg);
            onError === null || onError === void 0 ? void 0 : onError(errorMsg);
            return;
        }
        try {
            setLocalError(null);
            cartDispatch.clearError();
            await cartDispatch.removeCoupon();
            onRemoveSuccess === null || onRemoveSuccess === void 0 ? void 0 : onRemoveSuccess();
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : _('Failed to remove coupon');
            setLocalError(errorMessage);
            onError === null || onError === void 0 ? void 0 : onError(errorMessage);
        }
    }, [canRemoveCoupon, cartState.data, cartDispatch, onRemoveSuccess, onError]);
    const state = {
        isLoading,
        error: localError || ((_b = cartState.data) === null || _b === void 0 ? void 0 : _b.error) || null,
        appliedCoupon,
        canApplyCoupon,
        canRemoveCoupon,
        hasActiveCoupon
    };
    const actions = {
        applyCoupon,
        removeCoupon,
        clearError
    };
    return react.createElement(react.Fragment, null, children(state, actions));
};
//# sourceMappingURL=Coupon.js.map
// EXTERNAL MODULE: ./node_modules/react-hook-form/dist/index.esm.mjs
var index_esm = __webpack_require__(49785);
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
;// ./node_modules/@evershop/evershop/dist/components/common/ui/Label.js


function Label({ className, ...props }) {
    return (react.createElement("label", { "data-slot": "label", className: cn('gap-2 text-sm leading-none font-medium group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed', className), ...props }));
}

//# sourceMappingURL=Label.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/ui/Separator.js
/* unused harmony import specifier */ var SeparatorPrimitive;
/* unused harmony import specifier */ var Separator_cn;
/* unused harmony import specifier */ var Separator_React;



function Separator({ className, orientation = 'horizontal', ...props }) {
    return (Separator_React.createElement(SeparatorPrimitive, { "data-slot": "separator", orientation: orientation, className: Separator_cn('bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch', className), ...props }));
}

//# sourceMappingURL=Separator.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/ui/Field.js
/* unused harmony import specifier */ var Field_Separator;
/* unused harmony import specifier */ var Field_cn;
/* unused harmony import specifier */ var Field_React;





function FieldSet({ className, ...props }) {
    return (Field_React.createElement("fieldset", { "data-slot": "field-set", className: Field_cn('gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3 flex flex-col', className), ...props }));
}
function FieldLegend({ className, variant = 'legend', ...props }) {
    return (Field_React.createElement("legend", { "data-slot": "field-legend", "data-variant": variant, className: Field_cn('mb-3 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base', className), ...props }));
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
;// ./node_modules/@evershop/evershop/dist/components/frontStore/CouponForm.js








function CouponForm() {
    const form = (0,index_esm/* useForm */.mN)();
    const coupon = form.watch('coupon');
    return (react.createElement(Coupon, { onApplySuccess: () => {
            react_toastify_esm/* toast */.oR.success(_('Coupon applied successfully!'));
        }, onError: () => {
            react_toastify_esm/* toast */.oR.error(_('Invalid coupon'));
        }, onRemoveSuccess: () => {
            react_toastify_esm/* toast */.oR.success(_('Coupon removed successfully!'));
        } }, (state, actions) => (react.createElement("div", { className: "coupon-form" },
        react.createElement(Form, { form: form, method: "POST", submitBtn: false },
            react.createElement("div", { className: "flex justify-between gap-3" },
                react.createElement("div", { className: "w-4/5" },
                    react.createElement(InputField, { name: "coupon", required: true, validation: {
                            required: {
                                value: true,
                                message: _('Coupon code is required')
                            }
                        }, defaultValue: state.appliedCoupon || '', disabled: !!state.appliedCoupon, placeholder: _('Enter coupon code'), wrapperClassName: "mb-0 form-field" })),
                react.createElement("div", { className: "col-span-1" },
                    react.createElement(Button_Button, { isLoading: state.isLoading, onClick: async () => {
                            if (state.appliedCoupon) {
                                await actions.removeCoupon();
                            }
                            else {
                                const isValid = await form.trigger();
                                if (isValid) {
                                    actions.applyCoupon(coupon);
                                }
                            }
                        }, variant: state.appliedCoupon ? 'destructive' : 'default' }, state.appliedCoupon ? _('Remove') : _('Apply')))))))));
}
//# sourceMappingURL=CouponForm.js.map
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/circle-x.js
var circle_x = __webpack_require__(50180);
;// ./node_modules/@evershop/evershop/dist/components/frontStore/cart/CartTotalSummary.js









const SkeletonValue = ({ children, loading = false, className = '' }) => {
    if (!loading) {
        return react.createElement(react.Fragment, null, children);
    }
    return (react.createElement("span", { className: `relative ${className}` },
        react.createElement("span", { className: "opacity-0" }, children),
        react.createElement(Skeleton, { className: "absolute top-0 left-0 w-full h-full" })));
};
const Total = ({ total, totalTaxAmount, priceIncludingTax, loading = false }) => {
    return (react.createElement("div", { className: "summary__row grand-total flex justify-between py-2" },
        (priceIncludingTax && (react.createElement("div", null,
            react.createElement("div", { className: "font-bold" },
                react.createElement("span", null, _('Total'))),
            react.createElement("div", null,
                react.createElement("span", { className: "italic font-normal" },
                    "(",
                    _('Inclusive of tax ${totalTaxAmount}', { totalTaxAmount }),
                    ")"))))) || react.createElement("span", { className: "self-center font-bold" }, _('Total')),
        react.createElement("div", null,
            react.createElement("div", null),
            react.createElement(SkeletonValue, { loading: loading, className: "grand-total-value" }, total))));
};
const Tax = ({ showPriceIncludingTax, amount, loading = false }) => {
    if (showPriceIncludingTax) {
        return null;
    }
    return (react.createElement("div", { className: "summary-row flex justify-between py-2" },
        react.createElement("span", null, _('Tax')),
        react.createElement("div", null,
            react.createElement("div", null),
            react.createElement(SkeletonValue, { loading: loading, className: "text-right" }, amount))));
};
const Subtotal = ({ subTotal, loading = false }) => {
    return (react.createElement("div", { className: "flex justify-between gap-7 py-2" },
        react.createElement("div", null, _('Sub total')),
        react.createElement(SkeletonValue, { loading: loading, className: "text-right" }, subTotal)));
};
const Discount = ({ discountAmount, coupon, loading = false }) => {
    if (!coupon) {
        return (react.createElement("div", { className: "gap-7 py-2" },
            react.createElement(CouponForm, null)));
    }
    return (react.createElement("div", { className: "flex justify-between gap-7 py-2" },
        react.createElement(Coupon, null, (state, actions) => (react.createElement(react.Fragment, null,
            react.createElement("div", { className: "flex justify-start items-center gap-2" },
                react.createElement(SkeletonValue, { loading: loading, className: "text-right" },
                    react.createElement("span", null, _('Discount(${coupon})', { coupon }))),
                !state.isLoading && (react.createElement("a", { href: "#", className: "text-destructive", onClick: async (e) => {
                        e.preventDefault();
                        await actions.removeCoupon();
                    } },
                    react.createElement(circle_x/* default */.A, { className: "w-3.5 h-3.5" })))),
            react.createElement(SkeletonValue, { loading: loading, className: "text-right" }, discountAmount))))));
};
const Shipping = ({ method, cost, noShippingRequired, loading = false }) => {
    return (react.createElement("div", { className: "summary-row flex justify-between gap-7 py-2" },
        noShippingRequired && (react.createElement(react.Fragment, null,
            react.createElement("span", null, _('Shipping')),
            react.createElement("span", { className: "text-gray-500 italic font-normal" }, _('No shipping required')))),
        method && !noShippingRequired && (react.createElement(react.Fragment, null,
            react.createElement("span", null, _('Shipping (${method})', { method })),
            react.createElement("div", null,
                react.createElement(SkeletonValue, { loading: loading }, cost)))),
        !method && !noShippingRequired && (react.createElement(react.Fragment, null,
            react.createElement("span", null, _('Shipping')),
            react.createElement("span", { className: "text-gray-500 italic font-normal" }, _('Select shipping method'))))));
};
const DefaultCartSummary = ({ loading, showPriceIncludingTax, noShippingRequired, subTotal, discountAmount, coupon, shippingMethod, shippingCost, taxAmount, total }) => (react.createElement("div", { className: "cart__total__summary font-semibold" },
    react.createElement(common_Area, { id: "cartSummaryBeforeSubTotal", noOuter: true }),
    react.createElement(Subtotal, { subTotal: subTotal, loading: loading }),
    react.createElement(common_Area, { id: "cartSummaryAfterSubTotal", noOuter: true }),
    react.createElement(common_Area, { id: "cartSummaryBeforeDiscount", noOuter: true }),
    react.createElement(Discount, { discountAmount: discountAmount, coupon: coupon, loading: loading }),
    react.createElement(common_Area, { id: "cartSummaryAfterDiscount", noOuter: true }),
    react.createElement(common_Area, { id: "cartSummaryBeforeShipping", noOuter: true }),
    react.createElement(Shipping, { method: shippingMethod, cost: shippingCost, loading: loading, noShippingRequired: noShippingRequired }),
    react.createElement(common_Area, { id: "cartSummaryAfterShipping", noOuter: true }),
    react.createElement(common_Area, { id: "cartSummaryBeforeTax", noOuter: true }),
    react.createElement(Tax, { amount: taxAmount, showPriceIncludingTax: showPriceIncludingTax, loading: loading }),
    react.createElement(common_Area, { id: "cartSummaryAfterTax", noOuter: true }),
    react.createElement(common_Area, { id: "cartSummaryBeforeTotal", noOuter: true }),
    react.createElement(Total, { total: total, totalTaxAmount: taxAmount, priceIncludingTax: showPriceIncludingTax, loading: loading }),
    react.createElement(common_Area, { id: "cartSummaryAfterTotal", noOuter: true })));
function CartTotalSummary({ children }) {
    var _a, _b, _c, _d, _e, _f, _g;
    const { data: cart, loadingStates } = useCartState();
    const { config: { tax: { priceIncludingTax } } } = useAppState();
    const subTotal = priceIncludingTax
        ? ((_a = cart === null || cart === void 0 ? void 0 : cart.subTotalInclTax) === null || _a === void 0 ? void 0 : _a.text) || ''
        : ((_b = cart === null || cart === void 0 ? void 0 : cart.subTotal) === null || _b === void 0 ? void 0 : _b.text) || '';
    const discountAmount = ((_c = cart === null || cart === void 0 ? void 0 : cart.discountAmount) === null || _c === void 0 ? void 0 : _c.text) || '';
    const coupon = cart === null || cart === void 0 ? void 0 : cart.coupon;
    const shippingMethod = cart === null || cart === void 0 ? void 0 : cart.shippingMethodName;
    const shippingCost = priceIncludingTax
        ? ((_d = cart === null || cart === void 0 ? void 0 : cart.shippingFeeInclTax) === null || _d === void 0 ? void 0 : _d.text) || ''
        : ((_e = cart === null || cart === void 0 ? void 0 : cart.shippingFeeExclTax) === null || _e === void 0 ? void 0 : _e.text) || '';
    const taxAmount = ((_f = cart === null || cart === void 0 ? void 0 : cart.totalTaxAmount) === null || _f === void 0 ? void 0 : _f.text) || '';
    const total = ((_g = cart === null || cart === void 0 ? void 0 : cart.grandTotal) === null || _g === void 0 ? void 0 : _g.text) || '';
    return (react.createElement("div", { className: "grid grid-cols-1 gap-3" }, children ? (children({
        loading: Object.values(loadingStates).some((state) => state === true || (typeof state === 'string' && state !== null)),
        showPriceIncludingTax: priceIncludingTax,
        noShippingRequired: (cart === null || cart === void 0 ? void 0 : cart.noShippingRequired) || false,
        subTotal,
        discountAmount,
        coupon,
        shippingMethod,
        shippingCost,
        taxAmount,
        total
    })) : (react.createElement(DefaultCartSummary, { loading: Object.values(loadingStates).some((state) => state === true || (typeof state === 'string' && state !== null)), showPriceIncludingTax: priceIncludingTax, noShippingRequired: (cart === null || cart === void 0 ? void 0 : cart.noShippingRequired) || false, subTotal: subTotal, discountAmount: discountAmount, coupon: coupon, shippingMethod: shippingMethod, shippingCost: shippingCost, taxAmount: taxAmount, total: total }))));
}

//# sourceMappingURL=CartTotalSummary.js.map
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/shopping-bag.js
var shopping_bag = __webpack_require__(48110);
;// ./node_modules/@evershop/evershop/dist/components/frontStore/cart/DefaultMiniCartDropdownEmpty.js





const DefaultMiniCartDropdownEmpty = ({ setIsDropdownOpen }) => (react.createElement("div", { className: "minicart__empty p-8 text-center" },
    react.createElement(Area, { id: "miniCartEmptyBefore", noOuter: true }),
    react.createElement(shopping_bag/* default */.A, { width: 48, height: 48, className: "mx-auto text-muted-foreground mb-4" }),
    react.createElement("p", { className: "text-muted-foreground mb-4" }, _('Your cart is empty')),
    react.createElement(Button_Button, { variant: "default", onClick: () => setIsDropdownOpen(false), size: 'lg' }, _('Continue Shopping')),
    react.createElement(Area, { id: "miniCartEmptyAfter", noOuter: true })));
//# sourceMappingURL=DefaultMiniCartDropdownEmpty.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/ProductNoThumbnail.js

const ProductNoThumbnail = ({ width, height, className }) => {
    return (react.createElement("svg", { className: `max-w-full ${className}`, width: width || 100, height: height || 100, viewBox: "0 0 251 276", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        react.createElement("path", { d: "M62.2402 34.2864L0.329313 68.5728L0.131725 137.524L0 206.538L62.3061 240.95C96.5546 259.858 124.81 275.363 125.139 275.363C125.468 275.363 142.527 266.035 163.142 254.69C183.691 243.282 211.748 227.841 225.448 220.277L250.278 206.538V191.789V176.978L248.829 177.735C247.973 178.176 219.915 193.617 186.457 212.147C152.933 230.677 125.205 245.677 124.81 245.614C124.349 245.488 102.219 233.387 75.5444 218.639L27.0037 191.853V137.65V83.447L48.9359 71.346C60.9229 64.7282 82.9211 52.6271 97.7401 44.4337C112.493 36.2402 124.876 29.5594 125.139 29.5594C125.402 29.5594 142.593 38.9504 163.339 50.4212L223.801 83.447L233.337 78.0776L250.278 68.5728L223.801 54.1397C202.857 42.2908 125.6 -0.0629802 124.941 4.62725e-05C124.546 4.62725e-05 96.2912 15.4415 62.2402 34.2864Z", fill: "#BBBBBB" }),
        react.createElement("path", { d: "M188.367 102.796C154.514 121.515 126.325 137.019 125.732 137.146C125.073 137.335 108.542 128.511 87.0045 116.662L49.397 95.8632V110.8L49.4628 125.675L86.0166 145.843C106.105 156.936 123.229 166.264 124.085 166.579C125.402 167.02 134.623 162.167 187.445 132.986C221.43 114.141 249.488 98.5734 249.817 98.3213C250.08 98.0691 250.212 91.3253 250.146 83.321L249.949 68.7618L188.367 102.796Z", fill: "#BBBBBB" }),
        react.createElement("path", { d: "M243.362 126.557C239.74 128.511 211.814 143.953 181.254 160.844C150.694 177.735 125.468 191.537 125.139 191.537C124.81 191.537 107.751 182.21 87.1363 170.865L49.7263 150.192L49.5288 164.688C49.397 175.781 49.5946 179.373 50.1874 179.941C51.4388 181.012 124.349 221.16 125.139 221.16C125.798 221.16 248.763 153.406 249.817 152.524C250.08 152.272 250.212 145.528 250.146 137.461L249.949 122.902L243.362 126.557Z", fill: "#BBBBBB" })));
};

//# sourceMappingURL=ProductNoThumbnail.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/cart/CartSummaryItems.js





const CartSummarySkeleton = ({ rows = 2 }) => {
    return (react.createElement("ul", { className: "divide-y divide-border" }, Array.from({ length: rows }).map((_, i) => (react.createElement("li", { key: i, className: "flex items-center py-6 animate-pulse" },
        react.createElement("div", { className: "relative mr-4" },
            react.createElement("div", { className: "w-16 h-16 bg-gray-200 rounded border border-border p-2 box-border" }),
            react.createElement("span", { className: "absolute -top-2 -right-2 bg-muted rounded-full w-6 h-6 flex items-center justify-center text-muted-foreground text-sm" }, i + 1)),
        react.createElement("div", { className: "flex-1 min-w-0 items-start align-top" },
            react.createElement(Skeleton, { className: "h-4 w-3/5 mb-2" }),
            react.createElement(Skeleton, { className: "h-3 w-2/5 mb-1" })),
        react.createElement("div", { className: "ml-auto text-right" },
            react.createElement(Skeleton, { className: "h-4 w-16" })))))));
};
const CartSummaryItemsList = ({ items, loading, showPriceIncludingTax }) => {
    if (loading) {
        return react.createElement(CartSummarySkeleton, { rows: items.length });
    }
    if (items.length === 0) {
        return (react.createElement("div", { className: "text-center py-8 text-muted-foreground" },
            react.createElement("p", { className: "text-base" }, _('Your cart is empty')),
            react.createElement("p", { className: "text-sm mt-2" }, _('Add some items to get started'))));
    }
    return (react.createElement("ul", { className: "item__summary__list divide-y divide-divider mb-3" }, items.map((item) => (react.createElement("li", { key: item.uuid, className: "flex items-start py-3" },
        react.createElement("div", { className: "relative mr-4 self-center" },
            item.thumbnail && (react.createElement(Image, { width: 100, height: 100, src: item.thumbnail, alt: item.productName, className: "w-16 h-16 object-cover rounded border border-border p-2 box-border" })),
            !item.thumbnail && (react.createElement(ProductNoThumbnail, { className: "w-16 h-16 rounded border border-border p-2 box-border" })),
            react.createElement("span", { className: "absolute -top-2 -right-2 bg-muted text-muted-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm" }, item.qty)),
        react.createElement("div", { className: "flex-1 min-w-0 items-start align-top" },
            react.createElement("div", { className: "font-semibold text-sm mb-1" }, item.productName),
            item.variantOptions && item.variantOptions.length > 0 && (react.createElement("div", { className: "space-y-1" }, item.variantOptions.map((option) => (react.createElement("div", { key: option.attributeCode, className: "text-xs" },
                react.createElement("span", null, option.attributeName),
                ":",
                ' ',
                react.createElement("span", { className: "text-muted-foreground" }, option.optionText))))))),
        react.createElement("div", { className: "ml-auto text-right self-center" },
            react.createElement("div", { className: "font-semibold" }, showPriceIncludingTax
                ? item.lineTotalInclTax.text
                : item.lineTotal.text)))))));
};

//# sourceMappingURL=CartSummaryItems.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/cart/DefaultMiniCartItemList.js


const DefaultMiniCartItemList = ({ items, showPriceIncludingTax = true, loading = false }) => {
    return (react.createElement(CartSummaryItemsList, { items: items, loading: loading, showPriceIncludingTax: showPriceIncludingTax }));
};
//# sourceMappingURL=DefaultMiniCartItemList.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/cart/DefaultMiniCartDropdown.js









const DefaultMiniCartDropdown = ({ cart, isOpen, onClose, cartUrl, checkoutUrl, dropdownPosition = 'right', setIsDropdownOpen }) => {
    const totalQty = (cart === null || cart === void 0 ? void 0 : cart.totalQty) || 0;
    return (react.createElement(Sheet, { open: isOpen, onOpenChange: (open) => !open && onClose() },
        react.createElement(SheetContent, { side: dropdownPosition, className: "w-full md:w-1/3 border-border" },
            react.createElement(SheetHeader, { className: "border-b border-border" },
                react.createElement(SheetTitle, { className: "font-medium text-xl" }, _('Your Cart'))),
            totalQty === 0 ? (react.createElement(DefaultMiniCartDropdownEmpty, { setIsDropdownOpen: setIsDropdownOpen })) : (react.createElement("div", { className: "minicart__items__container flex flex-col px-5 justify-between h-full", style: { height: 'calc(100vh - 150px)' } },
                react.createElement(Area, { id: "miniCartItemsBefore", noOuter: true }),
                react.createElement("div", { className: "overflow-y-auto mb-8" },
                    react.createElement(CartItems, null, ({ items, loading }) => (react.createElement(DefaultMiniCartItemList, { items: items, loading: loading })))),
                react.createElement(Area, { id: "miniCartItemsAfter", noOuter: true }),
                react.createElement(Area, { id: "miniCartSummaryBefore", noOuter: true }),
                react.createElement(CartTotalSummary, null, ({ total }) => (react.createElement(react.Fragment, null,
                    react.createElement("div", { className: "minicart__summary flex justify-between items-center mb-3" },
                        react.createElement("span", { className: "font-medium text-gray-900" },
                            _('Subtotal'),
                            ":"),
                        react.createElement("span", { className: "font-semibold text-lg text-gray-900" }, total || '—')),
                    react.createElement(Button_Button, { variant: 'outline', size: 'lg', onClick: () => {
                            if (cartUrl) {
                                window.location.href = cartUrl;
                            }
                        }, className: "minicart__viewcart__button w-full " }, _('View Cart (${totalQty})', {
                        totalQty: totalQty.toString()
                    })),
                    react.createElement(Button_Button, { variant: 'default', size: 'lg', onClick: () => {
                            if (checkoutUrl) {
                                window.location.href = checkoutUrl;
                            }
                        }, className: "minicart__viewcart__button w-full " }, _('Checkout'))))),
                react.createElement(Area, { id: "miniCartSummaryAfter", noOuter: true }))))));
};
//# sourceMappingURL=DefaultMiniCartDropdown.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/cart/DefaultMiniCartIcon.js


const DefaultMiniCartIcon = ({ totalQty, onClick, isOpen, disabled = false, showItemCount = true, syncStatus }) => {
    return (react.createElement("button", { type: "button", onClick: onClick, disabled: disabled, className: `mini-cart-icon relative ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${isOpen ? 'active' : ''}`, "aria-label": `Shopping cart with ${totalQty} items` },
        syncStatus.syncing ? (react.createElement("div", { className: "w-6 h-6 flex items-center justify-center" },
            react.createElement("div", { className: "animate-spin rounded-full h-4 w-4 border-2 border-border" }))) : (react.createElement(shopping_bag/* default */.A, { className: "w-5 h-5 text-foreground hover:text-primary" })),
        showItemCount && totalQty > 0 && !syncStatus.syncing && (react.createElement("span", { className: "absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center font-normal" }, totalQty > 99 ? '99+' : totalQty))));
};
//# sourceMappingURL=DefaultMiniCartIcon.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/cart/MiniCart.js




function MiniCart({ cartUrl = '/cart', checkoutUrl = '/checkout', dropdownPosition = 'right', showItemCount = true, CartIconComponent, CartDropdownComponent, className = '', disabled = false }) {
    const { data: cartData, syncStatus } = useCartState();
    const [isDropdownOpen, setIsDropdownOpen] = (0,react.useState)(false);
    const cart = cartData;
    const handleCartClick = (0,react.useCallback)(() => {
        if (disabled)
            return;
        setIsDropdownOpen(!isDropdownOpen);
    }, [disabled, isDropdownOpen, cartUrl]);
    const handleDropdownClose = (0,react.useCallback)(() => {
        setIsDropdownOpen(false);
    }, []);
    (0,react.useEffect)(() => {
        if (syncStatus.synced && syncStatus.trigger === CartSyncTrigger.ADD_ITEM) {
            setIsDropdownOpen(true);
        }
    }, [syncStatus.synced, syncStatus.trigger]);
    return (react.createElement("div", { className: `mini__cart__wrapper relative ${className}` },
        CartIconComponent ? (react.createElement(CartIconComponent, { totalQty: (cart === null || cart === void 0 ? void 0 : cart.totalQty) || 0, onClick: handleCartClick, isOpen: isDropdownOpen, disabled: disabled, showItemCount: showItemCount, syncStatus: syncStatus })) : (react.createElement(DefaultMiniCartIcon, { totalQty: (cart === null || cart === void 0 ? void 0 : cart.totalQty) || 0, onClick: handleCartClick, isOpen: isDropdownOpen, disabled: disabled, showItemCount: showItemCount, syncStatus: syncStatus })),
        CartDropdownComponent ? (react.createElement(CartDropdownComponent, { cart: cart, dropdownPosition: dropdownPosition, onClose: handleDropdownClose, cartUrl: cartUrl, setIsDropdownOpen: setIsDropdownOpen })) : (react.createElement(DefaultMiniCartDropdown, { cart: cart, isOpen: isDropdownOpen, dropdownPosition: dropdownPosition, onClose: handleDropdownClose, cartUrl: cartUrl, checkoutUrl: checkoutUrl, setIsDropdownOpen: setIsDropdownOpen }))));
}
//# sourceMappingURL=MiniCart.js.map
;// ./node_modules/@evershop/evershop/dist/modules/checkout/pages/frontStore/all/MiniCartIcon.js


function MiniCartIcon({ cartUrl }) {
    return (react.createElement(MiniCart, { className: "flex justify-center items-center", cartUrl: cartUrl }));
}
const MiniCartIcon_layout = {
    areaId: 'headerMiddleRight',
    sortOrder: 20
};
const MiniCartIcon_query = (/* unused pure expression or super */ null && (`
  query Query {
    cartUrl: url(routeId: "cart"),
  }
`));
//# sourceMappingURL=MiniCartIcon.js.map
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
;// ./node_modules/@evershop/evershop/dist/components/common/Editor.js





const Paragraph = ({ data }) => {
    return react.createElement("p", { dangerouslySetInnerHTML: { __html: data.text } });
};
const Editor_Header = ({ data }) => {
    const tagName = `h${data.level}`;
    return react.createElement(tagName, null, data.text);
};
const List = ({ data }) => {
    return (react.createElement("ul", null, data.items.map((item, index) => (react.createElement("li", { key: index }, item)))));
};
const Quote = ({ data }) => {
    return (react.createElement("blockquote", null,
        react.createElement("p", null,
            "\"",
            data.text,
            "\""),
        data.caption && react.createElement("cite", null,
            "- ",
            data.caption)));
};
const Editor_Image = ({ data, columnSize }) => {
    const { file, caption, withBorder, withBackground, stretched, link } = data;
    const imageStyles = {
        border: withBorder ? '1px solid #ccc' : 'none',
        backgroundColor: withBackground ? '#f9f9f9' : 'transparent',
        width: stretched ? '100%' : 'auto',
        display: 'block',
        maxWidth: '100%',
        margin: '0 auto'
    };
    const imageWidth = file.width || 800;
    const imageHeight = file.height || (file.width ? Math.round(file.width * 0.75) : 600);
    // Calculate responsive sizes based on the columnSize prop
    // columnSize represents the fraction of the row that this column occupies (e.g., 1/2, 1/3, 2/3, etc.)
    let sizesValue;
    sizesValue = '100vw'; // On mobile, always full viewport width
    if (columnSize <= 0.25) {
        sizesValue = '(max-width: 640px) 100vw, (max-width: 768px) 80vw, 25vw';
    }
    else if (columnSize <= 0.34) {
        sizesValue = '(max-width: 640px) 100vw, (max-width: 768px) 80vw, 33vw';
    }
    else if (columnSize <= 0.5) {
        sizesValue = '(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw';
    }
    else if (columnSize <= 0.67) {
        sizesValue = '(max-width: 640px) 100vw, (max-width: 768px) 80vw, 67vw';
    }
    else if (columnSize <= 0.75) {
        sizesValue = '(max-width: 640px) 100vw, (max-width: 768px) 80vw, 75vw';
    }
    else {
        sizesValue = '(max-width: 640px) 100vw, 100vw';
    }
    const responsiveSizes = sizesValue;
    const imageElement = (react.createElement(Image, { src: file.url, alt: caption || 'Image', width: imageWidth, height: imageHeight, sizes: responsiveSizes, style: { ...imageStyles } }));
    return (react.createElement("div", { className: "editor-image-container" },
        link ? (react.createElement("a", { href: link, target: "_blank", rel: "noopener noreferrer" }, imageElement)) : (imageElement),
        caption && (react.createElement("p", { style: { textAlign: 'center', marginTop: '10px' } }, caption))));
};
const RawHtml = ({ data }) => {
    return react.createElement("div", { dangerouslySetInnerHTML: { __html: data.html } });
};
const RenderEditorJS = ({ blocks, columnSize }) => {
    return (react.createElement("div", { className: "prose prose-base max-w-none text-base" }, blocks.map((block, index) => {
        switch (block.type) {
            case 'paragraph':
                return react.createElement(Paragraph, { key: index, data: block.data });
            case 'header':
                return react.createElement(Editor_Header, { key: index, data: block.data });
            case 'list':
                return react.createElement(List, { key: index, data: block.data });
            case 'image':
                return (react.createElement(Editor_Image, { key: index, data: block.data, columnSize: columnSize }));
            case 'quote':
                return react.createElement(Quote, { key: index, data: block.data });
            case 'raw':
                return react.createElement(RawHtml, { key: index, data: block.data });
            default:
                return null;
        }
    })));
};
function Editor({ rows }) {
    return (react.createElement("div", { className: "editor__html space-y-6" }, rows.map((row, index) => {
        const rowClasses = getRowClasses(row.size);
        return (react.createElement("div", { className: `row__container grid ${rowClasses} grid-cols-1 gap-5`, key: index }, row.columns.map((column, index) => {
            var _a, _b;
            const columnClasses = getColumnClasses(column.size);
            return (react.createElement("div", { className: `column__container ${columnClasses} col-span-1`, key: index }, ((_a = column.data) === null || _a === void 0 ? void 0 : _a.blocks) && (react.createElement(RenderEditorJS, { blocks: (_b = column.data) === null || _b === void 0 ? void 0 : _b.blocks, columnSize: column.size / row.size }))));
        })));
    })));
}
//# sourceMappingURL=Editor.js.map
;// ./node_modules/@evershop/evershop/dist/modules/cms/pages/frontStore/cmsPageView/CmsPageView.js


function CmsPageView({ page }) {
    return (react.createElement("div", { className: "page-width" },
        react.createElement("div", { className: "prose prose-base max-w-none" },
            react.createElement("h1", { className: "cms__page__heading text-center text-3xl" }, page.name),
            react.createElement(Editor, { rows: page.content }))));
}
const CmsPageView_layout = {
    areaId: 'content',
    sortOrder: 1
};
const CmsPageView_query = (/* unused pure expression or super */ null && (`
  query Query {
    page: currentCmsPage {
      name
      content
    }
  }
`));
//# sourceMappingURL=CmsPageView.js.map
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/circle-user.js
var circle_user = __webpack_require__(68397);
;// ./node_modules/@evershop/evershop/dist/modules/customer/pages/frontStore/all/CustomerIcon.js


function UserIcon({ customer, accountUrl, loginUrl }) {
    return (react.createElement("div", { className: "self-center customer-icon" },
        react.createElement("a", { href: customer ? accountUrl : loginUrl },
            react.createElement(circle_user/* default */.A, { className: "w-5 h-5 text-foreground hover:text-primary" }))));
}
const CustomerIcon_layout = {
    areaId: 'headerMiddleRight',
    sortOrder: 10
};
const CustomerIcon_query = (/* unused pure expression or super */ null && (`
  query Query {
    customer: currentCustomer {
      uuid
      fullName
      email
    }
    accountUrl: url(routeId: "account")
    loginUrl: url(routeId: "login")
  }
`));
//# sourceMappingURL=CustomerIcon.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/catalog/ProductListEmptyRender.js

const ProductListEmptyRender = ({ message }) => {
    return (react.createElement("div", { className: "empty-product-list" }, typeof message === 'string' ? react.createElement("p", null, message) : message));
};
//# sourceMappingURL=ProductListEmptyRender.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/cart/AddToCart.js



const AddToCart = ({ product, qty, onSuccess, onError, children }) => {
    var _a;
    const cartDispatch = useCartDispatch();
    const cartState = useCartState();
    const [localError, setLocalError] = (0,react.useState)(null);
    const canAddToCart = product.isInStock && qty > 0 && !!cartState.data;
    const isLoading = cartState.loading;
    const clearError = (0,react.useCallback)(() => {
        setLocalError(null);
        cartDispatch.clearError();
    }, [cartDispatch]);
    const addToCart = (0,react.useCallback)(async () => {
        if (!canAddToCart) {
            const errorMsg = !product.isInStock
                ? _('Product is out of stock')
                : !cartState.data
                    ? _('Cart is not initialized')
                    : _('Invalid quantity');
            setLocalError(errorMsg);
            onError === null || onError === void 0 ? void 0 : onError(errorMsg);
            return;
        }
        try {
            setLocalError(null);
            cartDispatch.clearError();
            await cartDispatch.addItem({
                sku: product.sku,
                qty: qty
            });
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(qty);
        }
        catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : _('Failed to add item to cart');
            setLocalError(errorMessage);
            onError === null || onError === void 0 ? void 0 : onError(errorMessage);
        }
    }, [
        canAddToCart,
        product.isInStock,
        product.sku,
        qty,
        cartState.data,
        cartDispatch,
        onSuccess,
        onError
    ]);
    const state = {
        isLoading,
        error: localError || ((_a = cartState.data) === null || _a === void 0 ? void 0 : _a.error) || null,
        canAddToCart,
        isInStock: product.isInStock
    };
    const actions = {
        addToCart,
        clearError
    };
    return react.createElement(react.Fragment, null, children(state, actions));
};
//# sourceMappingURL=AddToCart.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/catalog/ProductListItemRender.js







const ProductListItemRender = ({ product, imageWidth, imageHeight, layout = 'grid', showAddToCart = false, customAddToCartRenderer }) => {
    if (layout === 'list') {
        return (react.createElement("div", { className: "product__list__item__inner group relative overflow-hidden flex gap-4 p-4" },
            react.createElement("div", { className: "product__list__image flex-shrink-0" },
                react.createElement("a", { href: product.url },
                    product.image && (react.createElement(Image, { src: product.image.url, alt: product.image.alt || product.name, width: imageWidth || 120, height: imageHeight || 120, loading: "lazy", sizes: "(max-width: 768px) 100vw, 33vw" // Assume 3 columns on larger screens
                        , className: "transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-lg" })),
                    !product.image && (react.createElement(ProductNoThumbnail, { width: imageWidth, height: imageHeight })))),
            react.createElement("div", { className: "product__list__info flex-1 flex flex-col justify-between" },
                react.createElement("div", null,
                    react.createElement("h3", { className: "product__list__name h5 mb-2" },
                        react.createElement("a", { href: product.url, className: "hover:text-primary transition-colors" }, product.name)),
                    react.createElement("div", { className: "product__list__sku text-sm text-gray-600 mb-2" }, _('SKU ${sku}', { sku: product.sku })),
                    react.createElement("div", { className: "product__list__price mb-2" }, product.price.special &&
                        product.price.regular < product.price.special ? (react.createElement("div", { className: "flex items-center gap-2" },
                        react.createElement("span", { className: "regular-price text-sm", style: { textDecoration: 'line-through', color: '#777' } }, product.price.regular.text),
                        react.createElement("span", { className: "special-price text-lg font-bold", style: { color: '#e53e3e' } }, product.price.special.text))) : (react.createElement("span", { className: "regular-price text-lg font-bold" }, product.price.regular.text))),
                    react.createElement("div", { className: "product__list__stock mb-3" }, product.inventory.isInStock ? (react.createElement("span", { className: "text-green-600 text-sm font-medium" }, _('In Stock'))) : (react.createElement("span", { className: "text-red-600 text-sm font-medium" }, _('Out of Stock'))))),
                showAddToCart && (react.createElement("div", { className: "product__list__actions invisible transform translate-y-2 transition-all duration-300 ease-in-out group-hover:visible group-hover:translate-y-0" }, customAddToCartRenderer ? (customAddToCartRenderer(product)) : (react.createElement(AddToCart, { product: {
                        sku: product.sku,
                        isInStock: product.inventory.isInStock
                    }, qty: 1, onError: (error) => react_toastify_esm/* toast */.oR.error(error) }, (state, actions) => (react.createElement(Button_Button, { disabled: !state.canAddToCart || state.isLoading, onClick: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        actions.addToCart();
                    } }, state.isLoading ? _('Adding...') : _('Add to Cart'))))))))));
    }
    return (react.createElement("div", { className: "product__list__item__inner group overflow-hidden" },
        react.createElement("a", { href: product.url, className: "product__list__link block" },
            react.createElement("div", { className: "product__list__image overflow-hidden flex w-full justify-center" },
                product.image && (react.createElement(Image, { src: product.image.url, alt: product.image.alt || product.name, width: imageWidth || 120, height: imageHeight || 120, sizes: "(max-width: 768px) 100vw, 33vw" // Assume 3 columns on larger screens
                    , className: "transition-transform duration-500 ease-in-out group-hover:scale-110" })),
                !product.image && (react.createElement(ProductNoThumbnail, { width: imageWidth, height: imageHeight }))),
            react.createElement("div", { className: "product__list__info mt-3" },
                react.createElement("h3", { className: "product__list__name h5 font-medium" }, product.name),
                react.createElement("div", { className: "product__list__price" }, product.price.special &&
                    product.price.regular < product.price.special ? (react.createElement(react.Fragment, null,
                    react.createElement("span", { className: "regular-price" }, product.price.regular.text),
                    react.createElement("span", { className: "special-price" }, product.price.special.text))) : (react.createElement("span", { className: "regular-price" }, product.price.regular.text))))),
        showAddToCart && (react.createElement("div", { className: "product__list__actions p-4 invisible transform translate-y-4 transition-all duration-300 ease-in-out group-hover:visible group-hover:translate-y-0" }, customAddToCartRenderer ? (customAddToCartRenderer(product)) : (react.createElement(AddToCart, { product: {
                sku: product.sku,
                isInStock: product.inventory.isInStock
            }, qty: 1, onError: (error) => react_toastify_esm/* toast */.oR.error(error) }, (state, actions) => (react.createElement(Button_Button, { className: 'w-full', disabled: !state.canAddToCart || state.isLoading, onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                actions.addToCart();
            } }, state.isLoading ? _('Adding...') : _('Add to Cart')))))))));
};
//# sourceMappingURL=ProductListItemRender.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/catalog/ProductListLoadingSkeleton.js

const ProductListLoadingSkeleton = ({ count = 4, gridColumns = 4, layout = 'grid' }) => {
    if (layout === 'list') {
        return (react.createElement("div", { className: "product-list", style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            } }, Array.from({ length: count }).map((_, i) => (react.createElement("div", { key: i, className: "product-skeleton product-skeleton-list", style: {
                display: 'flex',
                gap: '20px'
            } },
            react.createElement("div", { className: "skeleton-image", style: {
                    flexShrink: 0,
                    width: '120px',
                    height: '120px',
                    backgroundColor: '#f0f0f0'
                } }),
            react.createElement("div", { className: "skeleton-content", style: { flex: 1 } },
                react.createElement("div", { className: "skeleton-name", style: {
                        height: '20px',
                        backgroundColor: '#f0f0f0',
                        marginBottom: '10px',
                        width: '60%'
                    } }),
                react.createElement("div", { className: "skeleton-sku", style: {
                        height: '16px',
                        backgroundColor: '#f0f0f0',
                        marginBottom: '10px',
                        width: '30%'
                    } }),
                react.createElement("div", { className: "skeleton-price", style: {
                        height: '20px',
                        backgroundColor: '#f0f0f0',
                        marginBottom: '10px',
                        width: '25%'
                    } }),
                react.createElement("div", { className: "skeleton-stock", style: {
                        height: '16px',
                        backgroundColor: '#f0f0f0',
                        width: '20%'
                    } })))))));
    }
    // Compute responsive grid columns class based on gridColumns
    const className = (() => {
        switch (gridColumns) {
            case 1:
                return 'grid-cols-1';
            case 2:
                return 'grid-cols-1 md:grid-cols-2';
            case 3:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
            case 4:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
            case 5:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5';
            case 6:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-6';
            default:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
        }
    })();
    return (react.createElement("div", { className: `product__list grid gap-8 ${className}` }, Array.from({ length: count }).map((_, i) => (react.createElement("div", { key: i, className: "product-skeleton" },
        react.createElement("div", { className: "skeleton-image", style: {
                aspectRatio: '1/1',
                backgroundColor: '#f0f0f0',
                marginBottom: '10px'
            } }),
        react.createElement("div", { className: "skeleton-name", style: {
                height: '20px',
                backgroundColor: '#f0f0f0',
                marginBottom: '10px',
                width: '80%'
            } }),
        react.createElement("div", { className: "skeleton-price", style: {
                height: '20px',
                backgroundColor: '#f0f0f0',
                width: '40%'
            } }))))));
};
//# sourceMappingURL=ProductListLoadingSkeleton.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/catalog/ProductList.js





const ProductList = ({ products = [], imageWidth = 300, imageHeight = 300, isLoading = false, emptyMessage = _('No products found'), className = '', layout = 'grid', gridColumns = 4, showAddToCart = false, customAddToCartRenderer, renderItem }) => {
    if (isLoading) {
        return (react.createElement(ProductListLoadingSkeleton, { count: layout === 'list' ? 5 : gridColumns * 2, gridColumns: gridColumns, layout: layout }));
    }
    if (!products || products.length === 0) {
        return react.createElement(ProductListEmptyRender, { message: emptyMessage });
    }
    const layoutClass = layout === 'grid' ? 'product__grid' : 'product__list';
    // Compute responsive grid columns class based on gridColumns
    const gridClassName = (() => {
        switch (gridColumns) {
            case 1:
                return 'grid-cols-1';
            case 2:
                return 'grid-cols-1 md:grid-cols-2 gap-8';
            case 3:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
            case 4:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6';
            case 5:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6';
            case 6:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6';
            default:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6';
        }
    })();
    const styleClasses = layout === 'grid' ? 'grid' : 'flex flex-col';
    const containerClass = `${layoutClass} ${gridClassName} ${className} ${styleClasses}`;
    const itemImageWidth = layout === 'list' ? (imageWidth > 150 ? 150 : imageWidth) : imageWidth;
    const itemImageHeight = layout === 'list' ? (imageHeight > 150 ? 150 : imageHeight) : imageHeight;
    return (react.createElement("div", { className: containerClass }, products.map((product) => (react.createElement("div", { key: product.productId, className: `product__list__item ${layout === 'list'
            ? 'product__list__item__list'
            : 'product__list__item__grid'}` }, renderItem ? (renderItem(product)) : (react.createElement(ProductListItemRender, { product: product, imageWidth: itemImageWidth, imageHeight: itemImageHeight, layout: layout, showAddToCart: showAddToCart, customAddToCartRenderer: customAddToCartRenderer })))))));
};
//# sourceMappingURL=ProductList.js.map
;// ./node_modules/@evershop/evershop/dist/modules/catalog/components/CollectionProducts.js



function CollectionProducts({ collection, collectionProductsWidget: { countPerRow } = {} }) {
    var _a;
    if (!collection) {
        return null;
    }
    return (react.createElement("div", { className: "pt-7 collection__products__widget" },
        react.createElement("div", { className: "page-width" },
            react.createElement("h3", { className: "text-center uppercase h5 tracking-widest" }, collection === null || collection === void 0 ? void 0 : collection.name),
            react.createElement("div", { className: "flex justify-center" }, (collection === null || collection === void 0 ? void 0 : collection.description) && react.createElement(Editor, { rows: collection === null || collection === void 0 ? void 0 : collection.description })),
            react.createElement("div", { className: "mt-3" },
                react.createElement(ProductList, { products: (_a = collection === null || collection === void 0 ? void 0 : collection.products) === null || _a === void 0 ? void 0 : _a.items, gridColumns: countPerRow })))));
}
const CollectionProducts_query = (/* unused pure expression or super */ null && (`
  query Query($collection: String, $count: Int, $countPerRow: Int) {
    collection (code: $collection) {
      collectionId
      name
      description
      products (filters: [{key: "limit", operation: eq, value: $count}]) {
        items {
          ...Product
        }
      }
    }
    collectionProductsWidget(collection: $collection, count: $count, countPerRow: $countPerRow) {
      countPerRow
    }
  }
`));
const CollectionProducts_fragments = (/* unused pure expression or super */ null && (`
  fragment Product on Product {
    productId
    name
    sku
    price {
      regular {
        value
        text
      }
      special {
        value
        text
      }
    }
    inventory {
      isInStock
    }
    image {
      alt
      url
    }
    url
  }
`));
const variables = (/* unused pure expression or super */ null && (`{
  collection: getWidgetSetting("collection"),
  count: getWidgetSetting("count"),
  countPerRow: getWidgetSetting("countPerRow", 4)
}`));
//# sourceMappingURL=CollectionProducts.js.map
;// ./node_modules/@evershop/evershop/dist/modules/cms/components/TextBlock.js


function TextBlock({ textWidget: { text, className } }) {
    return (react.createElement("div", { className: `text-block-widget ${className}` },
        react.createElement(Editor, { rows: text })));
}
const TextBlock_query = (/* unused pure expression or super */ null && (`
  query Query($text: String, $className: String) {
    textWidget(text: $text, className: $className) {
      ...TextBlockWidget
    }
  }
`));
const TextBlock_fragments = (/* unused pure expression or super */ null && (`
  fragment TextBlockWidget on TextBlockWidget {
    text
    className
  }
`));
const TextBlock_variables = (/* unused pure expression or super */ null && (`{
  text: getWidgetSetting("text"),
  className: getWidgetSetting("className")
}`));
//# sourceMappingURL=TextBlock.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/ui/hooks/useIsMobile.js

const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
    const [isMobile, setIsMobile] = react.useState(undefined);
    react.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };
        mql.addEventListener('change', onChange);
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        return () => mql.removeEventListener('change', onChange);
    }, []);
    return !!isMobile;
}
//# sourceMappingURL=useIsMobile.js.map
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/navigation-menu/root/NavigationMenuRoot.js + 3 modules
var NavigationMenuRoot = __webpack_require__(89608);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/navigation-menu/list/NavigationMenuList.js
var NavigationMenuList = __webpack_require__(12379);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/navigation-menu/item/NavigationMenuItem.js
var NavigationMenuItem = __webpack_require__(49017);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/navigation-menu/trigger/NavigationMenuTrigger.js + 2 modules
var NavigationMenuTrigger = __webpack_require__(29889);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/navigation-menu/content/NavigationMenuContent.js
var NavigationMenuContent = __webpack_require__(4027);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/navigation-menu/portal/NavigationMenuPortal.js
var NavigationMenuPortal = __webpack_require__(19087);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/navigation-menu/positioner/NavigationMenuPositioner.js
var NavigationMenuPositioner = __webpack_require__(13283);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/navigation-menu/popup/NavigationMenuPopup.js
var NavigationMenuPopup = __webpack_require__(96111);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/navigation-menu/viewport/NavigationMenuViewport.js + 1 modules
var NavigationMenuViewport = __webpack_require__(17019);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/navigation-menu/link/NavigationMenuLink.js
var NavigationMenuLink = __webpack_require__(18907);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/chevron-down.js
var chevron_down = __webpack_require__(75107);
;// ./node_modules/@evershop/evershop/dist/components/common/ui/NavigationMenu.js
/* unused harmony import specifier */ var NavigationMenuPrimitive;
/* unused harmony import specifier */ var NavigationMenu_cn;
/* unused harmony import specifier */ var NavigationMenu_React;





function NavigationMenu({ className, children, ...props }) {
    return (react.createElement(NavigationMenuRoot/* NavigationMenuRoot */.e, { "data-slot": "navigation-menu", className: cn('group/navigation-menu relative flex max-w-max flex-1 items-center justify-center', className), ...props },
        children,
        react.createElement(NavigationMenu_NavigationMenuPositioner, null)));
}
function NavigationMenu_NavigationMenuList({ className, ...props }) {
    return (react.createElement(NavigationMenuList/* NavigationMenuList */.S, { "data-slot": "navigation-menu-list", className: cn('gap-0 group flex flex-1 list-none items-center justify-center', className), ...props }));
}
function NavigationMenu_NavigationMenuItem({ className, ...props }) {
    return (react.createElement(NavigationMenuItem/* NavigationMenuItem */.J, { "data-slot": "navigation-menu-item", className: cn('relative', className), ...props }));
}
const navigationMenuTriggerStyle = (0,dist/* cva */.F)('bg-background hover:bg-muted focus:bg-muted data-open:hover:bg-muted data-open:focus:bg-muted data-open:bg-muted/50 focus-visible:ring-ring/50 data-popup-open:bg-muted/50 data-popup-open:hover:bg-muted rounded-md px-4 py-2 text-sm font-medium transition-all focus-visible:ring-[3px] focus-visible:outline-1 disabled:opacity-50 group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center disabled:pointer-events-none outline-none');
function NavigationMenu_NavigationMenuTrigger({ className, children, ...props }) {
    return (react.createElement(NavigationMenuTrigger/* NavigationMenuTrigger */.w, { "data-slot": "navigation-menu-trigger", className: cn(navigationMenuTriggerStyle(), 'group', className), ...props },
        children,
        ' ',
        react.createElement(chevron_down/* default */.A, { className: "relative top-px ml-1 size-3 transition duration-300 group-data-open/navigation-menu-trigger:rotate-180 group-data-popup-open/navigation-menu-trigger:rotate-180", "aria-hidden": "true" })));
}
function NavigationMenu_NavigationMenuContent({ className, ...props }) {
    return (react.createElement(NavigationMenuContent/* NavigationMenuContent */.h, { "data-slot": "navigation-menu-content", className: cn('data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-open:animate-in group-data-[viewport=false]/navigation-menu:data-closed:animate-out group-data-[viewport=false]/navigation-menu:data-closed:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-open:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-open:fade-in-0 group-data-[viewport=false]/navigation-menu:data-closed:fade-out-0 group-data-[viewport=false]/navigation-menu:ring-foreground/10 p-2 pr-2.5 ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:ring-1 group-data-[viewport=false]/navigation-menu:duration-300 h-full w-auto **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none', className), ...props }));
}
function NavigationMenu_NavigationMenuPositioner({ className, side = 'bottom', sideOffset = 8, align = 'start', alignOffset = 0, ...props }) {
    return (react.createElement(NavigationMenuPortal/* NavigationMenuPortal */.a, null,
        react.createElement(NavigationMenuPositioner/* NavigationMenuPositioner */.W, { side: side, sideOffset: sideOffset, align: align, alignOffset: alignOffset, className: cn('transition-[top,left,right,bottom] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[side=bottom]:before:-top-2.5 data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0 isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) data-instant:transition-none', className), ...props },
            react.createElement(NavigationMenuPopup/* NavigationMenuPopup */.Q, { className: "bg-popover text-popover-foreground ring-foreground/10 rounded-lg shadow ring-1 transition-all ease-[cubic-bezier(0.22,1,0.36,1)] outline-none data-ending-style:scale-90 data-ending-style:opacity-0 data-ending-style:duration-150 data-starting-style:scale-90 data-starting-style:opacity-0 xs:w-(--popup-width) relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin)" },
                react.createElement(NavigationMenuViewport/* NavigationMenuViewport */.Q, { className: "relative size-full overflow-hidden" })))));
}
function NavigationMenu_NavigationMenuLink({ className, ...props }) {
    return (react.createElement(NavigationMenuLink/* NavigationMenuLink */.W, { "data-slot": "navigation-menu-link", className: cn("data-[active=true]:focus:bg-muted data-[active=true]:hover:bg-muted data-[active=true]:bg-muted/50 focus-visible:ring-ring/50 hover:bg-muted focus:bg-muted flex items-center gap-1.5 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4", className), ...props }));
}
function NavigationMenuIndicator({ className, ...props }) {
    return (NavigationMenu_React.createElement(NavigationMenuPrimitive.Icon, { "data-slot": "navigation-menu-indicator", className: NavigationMenu_cn('data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-1 flex h-1.5 items-end justify-center overflow-hidden', className), ...props },
        NavigationMenu_React.createElement("div", { className: "bg-border rounded-tl-sm shadow-md relative top-[60%] h-2 w-2 rotate-45" })));
}

//# sourceMappingURL=NavigationMenu.js.map
;// ./node_modules/@evershop/evershop/dist/modules/cms/components/BasicMenu.js




function BasicMenu({ basicMenuWidget: { menus, isMain, className } }) {
    const [isOpen, setIsOpen] = react.useState(!isMain);
    const isMobile = useIsMobile();
    const [currentPath, setCurrentPath] = react.useState('');
    react.useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);
    const isActive = (url) => {
        if (url === '/') {
            return currentPath === '/';
        }
        return currentPath.startsWith(url);
    };
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (react.createElement("div", { className: className },
        react.createElement("div", { className: "flex justify-start gap-4 items-center" },
            react.createElement("nav", { className: "p-2 relative md:flex md:justify-center w-full" },
                react.createElement("div", { className: "flex justify-between items-center w-full" },
                    isMain && isMobile && (react.createElement("div", null,
                        react.createElement("a", { href: "#", onClick: (e) => {
                                e.preventDefault();
                                toggleMenu();
                            }, className: "text-black focus:outline-none" },
                            react.createElement("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                                react.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16m-7 6h7" }))))),
                    react.createElement("div", { className: cn(isMain
                            ? 'md:flex absolute md:relative -left-10 md:left-0 top-full md:top-auto mt-2 md:mt-0 w-screen md:w-auto p-2 md:p-0 min-w-62.5 bg-white md:bg-transparent z-30'
                            : 'flex relative -left-10 md:left-0 w-screen md:w-auto p-2 md:p-0 min-w-62.5 bg-white md:bg-transparent', isOpen ? 'block' : 'hidden', 'md:flex') },
                        react.createElement(NavigationMenu, { className: "w-full max-w-full" },
                            react.createElement(NavigationMenu_NavigationMenuList, { className: "flex-col md:flex-row items-start md:items-center w-full md:w-auto" }, menus.map((item) => (react.createElement(NavigationMenu_NavigationMenuItem, { key: item.uuid, className: "w-full md:w-auto" }, item.children.length > 0 && !isMobile ? (react.createElement(react.Fragment, null,
                                react.createElement(NavigationMenu_NavigationMenuTrigger, { className: "w-full md:w-auto justify-start md:justify-center bg-transparent hover:bg-transparent focus:bg-transparent data-open:bg-transparent data-open:hover:bg-transparent data-open:focus:bg-transparent data-popup-open:bg-transparent data-popup-open:hover:bg-transparent hover:font-semibold hover:text-primary" }, item.name),
                                react.createElement(NavigationMenu_NavigationMenuContent, null,
                                    react.createElement("ul", { className: "flex flex-col min-w-50 p-2" }, item.children.map((subItem) => (react.createElement("li", { key: subItem.uuid },
                                        react.createElement(NavigationMenu_NavigationMenuLink, { href: subItem.url, className: "w-full" }, subItem.name)))))))) : (react.createElement(NavigationMenu_NavigationMenuLink, { href: item.url, className: "w-full md:w-auto px-4 py-2 hover:text-primary data-[active=true]:bg-transparent data-[active=true]:hover:bg-transparent transition-colors data-[active=true]:text-primary data-[active=true]:font-semibold hover:bg-transparent focus:bg-transparent hover:underline text-xl md:text-base", "data-active": isActive(item.url) }, item.name)))))))))))));
}
const BasicMenu_query = (/* unused pure expression or super */ null && (`
  query Query($settings: JSON) {
    basicMenuWidget(settings: $settings) {
      menus {
        id
        name
        url
        type
        uuid
        children {
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
const BasicMenu_variables = (/* unused pure expression or super */ null && (`{
  settings: getWidgetSetting()
}`));
//# sourceMappingURL=BasicMenu.js.map
;// ./node_modules/@evershop/evershop/dist/modules/cms/components/Banner.js


function Banner({ bannerWidget: { src, alignment, width, height, alt } }) {
    // Parse tailwind classes for alignment
    const alignmentClass = alignment === 'left'
        ? 'justify-start'
        : alignment === 'center'
            ? 'justify-center'
            : 'justify-end';
    return (react.createElement("div", { className: `banner-widget w-full flex ${alignmentClass}` },
        react.createElement(Image, { src: src, width: parseInt(width, 10), height: parseInt(height, 10), className: alignmentClass, alt: alt, priority: true })));
}
const Banner_query = (/* unused pure expression or super */ null && (`
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
const Banner_variables = (/* unused pure expression or super */ null && (`{
  src: getWidgetSetting("src"),
  alignment: getWidgetSetting("alignment"),
  width: getWidgetSetting("width"),
  height: getWidgetSetting("height"),
  alt: getWidgetSetting("alt")
}`));
//# sourceMappingURL=Banner.js.map
// EXTERNAL MODULE: ./node_modules/react-slick/lib/index.js
var lib = __webpack_require__(4589);
;// ./node_modules/@evershop/evershop/dist/modules/cms/components/Slideshow.js




function PrevArrow(props) {
    const { onClick } = props;
    return (react.createElement("button", { className: "absolute bottom-[20px] right-[70px] z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-black/70 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 md:bottom-[20px] md:right-[70px] md:h-10 md:w-10", onClick: onClick, "aria-label": "Previous slide", type: "button" },
        react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "h-6 w-6 md:h-6 md:w-6" },
            react.createElement("polyline", { points: "15 18 9 12 15 6" }))));
}
function NextArrow(props) {
    const { onClick } = props;
    return (react.createElement("button", { className: "absolute bottom-[20px] right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-black/70 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 md:bottom-[20px] md:right-5 md:h-10 md:w-10", onClick: onClick, "aria-label": "Next slide", type: "button" },
        react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24", height: "24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "h-6 w-6 md:h-6 md:w-6" },
            react.createElement("polyline", { points: "9 18 15 12 9 6" }))));
}
function CustomDot(props) {
    const { onClick, active, className } = props;
    const isActive = active || (className && className.includes('active'));
    return (react.createElement("button", { onClick: onClick, className: `mx-1 my-0 h-3 w-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white/50 md:h-3 md:w-3 ${isActive
            ? '!bg-black scale-125 shadow-md'
            : '!bg-black/70 !hover:bg-black/90'}`, "aria-label": "Go to slide", type: "button" }));
}
const SliderComponent = lib["default"];
function Slideshow({ slideshowWidget: { slides = [], autoplay = true, autoplaySpeed = 3000, arrows = true, dots = true } }) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: Boolean(autoplay),
        autoplaySpeed: Number(autoplaySpeed) || 3000,
        arrows: Boolean(arrows),
        fade: false,
        pauseOnHover: true,
        adaptiveHeight: true,
        nextArrow: arrows ? react.createElement(NextArrow, null) : undefined,
        prevArrow: arrows ? react.createElement(PrevArrow, null) : undefined,
        customPaging: function (i) {
            return react.createElement(CustomDot, { active: false });
        },
        appendDots: (dots) => (react.createElement("div", { className: "w-full flex justify-center items-center" },
            react.createElement("div", { className: "pr-[120px] md:pr-[120px]" }, dots))),
        dotsClass: 'slick-dots custom-dots-container'
    };
    if (!slides || slides.length === 0) {
        return null;
    }
    const containerClasses = ['slideshow-widget', 'relative', 'w-full'].join(' ');
    const containerStyle = {
        height: 'auto',
        maxWidth: '100%'
    };
    const sliderStyle = {
        height: 'auto' // Adaptive height for slider
    };
    return (react.createElement("div", { className: containerClasses, style: containerStyle },
        react.createElement(SliderComponent, { ...settings, style: sliderStyle }, slides.map((slide) => (react.createElement("div", { key: slide.id, className: "relative lg:h-auto slide__wrapper !block", style: { display: 'block' } },
            react.createElement("div", { className: "relative w-full h-full" },
                react.createElement(Image, { src: slide.image, alt: slide.headline || 'Slideshow image', width: slide.width || 1920, height: slide.height || 0, style: {
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        objectPosition: 'center'
                    }, sizes: "100vw", priority: true }),
                react.createElement("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-8" }, (slide.headline ||
                    slide.subText ||
                    (slide.buttonText && slide.buttonLink)) && (react.createElement("div", { className: "p-4 md:p-8 rounded-lg max-w-3xl" },
                    slide.headline && (react.createElement("h2", { className: "text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 drop-shadow-lg" }, slide.headline)),
                    slide.subText && (react.createElement("p", { className: "text-white text-sm md:text-base lg:text-lg mb-4 md:mb-8 max-w-2xl mx-auto drop-shadow-md" }, slide.subText)),
                    slide.buttonText && slide.buttonLink && (react.createElement("a", { href: slide.buttonLink, className: "inline-block px-6 py-3 rounded-lg text-white font-medium transition-all hover:opacity-90 hover:scale-105", style: {
                            backgroundColor: slide.buttonColor || '#3B82F6'
                        } }, slide.buttonText))))))))))));
}
const Slideshow_query = (/* unused pure expression or super */ null && (`
  query Query($slides: [SlideInput], $autoplay: Boolean, $autoplaySpeed: Int, $arrows: Boolean, $dots: Boolean) {
    slideshowWidget(
      slides: $slides,
      autoplay: $autoplay,
      autoplaySpeed: $autoplaySpeed,
      arrows: $arrows,
      dots: $dots
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
const Slideshow_fragments = (/* unused pure expression or super */ null && (`
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
const Slideshow_variables = (/* unused pure expression or super */ null && (`{
  slides: getWidgetSetting("slides"),
  autoplay: getWidgetSetting("autoplay"),
  autoplaySpeed: getWidgetSetting("autoplaySpeed"),
  arrows: getWidgetSetting("arrows"),
  dots: getWidgetSetting("dots")
}`));
//# sourceMappingURL=Slideshow.js.map
;// ./.evershop/build/frontStore/cmsPageView/client/entry.js

      
      
      
      
      
















common_Area.defaultProps.components = {
  body: {
    e07002cce: {
      id: 'e07002cce',
      sortOrder: 1,
      component: { default: Base }
    },
    e1e707474: {
      id: 'e1e707474',
      sortOrder: 10,
      component: { default: Notification }
    }
  },
  content: {
    e7fcc885c: {
      id: 'e7fcc885c',
      sortOrder: 0,
      component: { default: all_Breadcrumb }
    },
    e728f4136: {
      id: 'e728f4136',
      sortOrder: 1,
      component: { default: CmsPageView }
    }
  },
  head: {
    e639c2bb1: {
      id: 'e639c2bb1',
      sortOrder: 5,
      component: { default: GlobalCss }
    },
    e428f2486: {
      id: 'e428f2486',
      sortOrder: 5,
      component: { default: HeadTags }
    },
    e3ae56344: {
      id: 'e3ae56344',
      sortOrder: 1,
      component: { default: TailwindCss }
    }
  },
  headerMiddleCenter: {
    e2f3dc7b4: {
      id: 'e2f3dc7b4',
      sortOrder: 10,
      component: { default: Logo }
    }
  },
  headerMiddleRight: {
    e64e1169c: {
      id: 'e64e1169c',
      sortOrder: 5,
      component: { default: SearchBox_SearchBox }
    },
    e52df9546: {
      id: 'e52df9546',
      sortOrder: 20,
      component: { default: MiniCartIcon }
    },
    e6f78f685: {
      id: 'e6f78f685',
      sortOrder: 10,
      component: { default: UserIcon }
    }
  },
  '*': {
    e68b9036a: {
      id: 'e68b9036a',
      sortOrder: 0,
      component: { default: CollectionProducts }
    },
    e56a5bfd6: {
      id: 'e56a5bfd6',
      sortOrder: 0,
      component: { default: TextBlock }
    },
    e6e36f055: {
      id: 'e6e36f055',
      sortOrder: 0,
      component: { default: BasicMenu }
    },
    e58e4cd87: {
      id: 'e58e4cd87',
      sortOrder: 0,
      component: { default: Banner }
    },
    e52783d53: {
      id: 'e52783d53',
      sortOrder: 0,
      component: { default: Slideshow }
    }
  }
} 
react_dom.hydrate(
        react.createElement(HydrateFrontStore, null),
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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	/* webpack/runtime/runtimeId */
/******/ 	(() => {
/******/ 		__webpack_require__.j = 1619;
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
/******/ 			1619: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [4286], () => (__webpack_require__(71280)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;