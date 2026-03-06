/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 38136
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
    const context = (0,react.useContext)(CustomerContext);
    if (context === undefined) {
        throw new Error('useCustomer must be used within a CustomerProvider');
    }
    return context;
};
const useCustomerDispatch = () => {
    const context = (0,react.useContext)(CustomerDispatchContext);
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
;// ./node_modules/@evershop/evershop/dist/components/frontStore/checkout/CheckoutContext.js




const CheckoutContext_initialState = {
    orderPlaced: false,
    orderId: undefined,
    loadingStates: {
        placingOrder: false
    },
    allowGuestCheckout: false, // Default to false, will be set by provider
    checkoutData: {}, // Initialize empty checkout data
    registeredPaymentComponents: {} // Initialize empty payment component registry
};
// Reducer with Immer for immutable updates
const checkoutReducer = (state, action) => {
    return (0,immer/* produce */.jM)(state, (draft) => {
        switch (action.type) {
            case 'SET_PLACING_ORDER':
                draft.loadingStates.placingOrder = action.payload;
                break;
            case 'SET_ORDER_PLACED':
                draft.orderPlaced = true;
                draft.orderId = action.payload.orderId;
                draft.loadingStates.placingOrder = false;
                break;
            case 'SET_CHECKOUT_DATA':
                draft.checkoutData = action.payload;
                break;
            case 'UPDATE_CHECKOUT_DATA':
                draft.checkoutData = { ...draft.checkoutData, ...action.payload };
                break;
            case 'CLEAR_CHECKOUT_DATA':
                draft.checkoutData = {};
                break;
            case 'REGISTER_PAYMENT_COMPONENT':
                draft.registeredPaymentComponents[action.payload.code] =
                    action.payload.component;
                break;
        }
    });
};
// Contexts
const CheckoutContext = (0,react.createContext)(undefined);
const CheckoutDispatchContext = (0,react.createContext)(undefined);
// Retry utility (similar to cart context)
const CheckoutContext_retry = async (fn, retries = 3, delay = 1000) => {
    try {
        return await fn();
    }
    catch (error) {
        if (retries > 0) {
            await new Promise((resolve) => setTimeout(resolve, delay));
            return CheckoutContext_retry(fn, retries - 1, delay * 2);
        }
        throw error;
    }
};
function CheckoutProvider({ children, placeOrderApi, checkoutSuccessUrl, allowGuestCheckout = false, form, enableForm, disableForm }) {
    var _a, _b, _c, _d, _e;
    const [state, dispatch] = (0,react.useReducer)(checkoutReducer, {
        ...CheckoutContext_initialState,
        allowGuestCheckout
    });
    // Get cart state for computing requiresShipment and cartId
    const cartState = useCartState();
    const cartDispatch = useCartDispatch();
    const cartId = (_a = cartState === null || cartState === void 0 ? void 0 : cartState.data) === null || _a === void 0 ? void 0 : _a.uuid;
    // Get payment methods - return the list from cart context
    const getPaymentMethods = (0,react.useCallback)(() => {
        var _a;
        return (((_a = cartState.data) === null || _a === void 0 ? void 0 : _a.availablePaymentMethods) || []).map((method) => ({
            code: method.code,
            name: method.name
        }));
    }, [(_b = cartState.data) === null || _b === void 0 ? void 0 : _b.availablePaymentMethods]);
    // Get shipping methods - if params provided, fetch dynamically; otherwise return from cart context
    const getShippingMethods = (0,react.useCallback)(async (params) => {
        var _a, _b;
        if (params) {
            // Fetch shipping methods dynamically based on address
            try {
                await cartDispatch.fetchAvailableShippingMethods(params);
                // Get updated methods from cart state
                const methods = ((_a = cartState.data) === null || _a === void 0 ? void 0 : _a.availableShippingMethods) || [];
                return methods.map((method) => ({
                    code: method.code,
                    name: method.name,
                    cost: method.cost || { value: 0, text: 'Free' }
                }));
            }
            catch (error) {
                // Return empty array on error, let the error be handled by cart context
                return [];
            }
        }
        else {
            // Return the initial shipping methods from cart context
            return (((_b = cartState.data) === null || _b === void 0 ? void 0 : _b.availableShippingMethods) || []).map((method) => ({
                code: method.code,
                name: method.name,
                cost: method.cost || { value: 0, text: 'Free' }
            }));
        }
    }, [cartDispatch, (_c = cartState.data) === null || _c === void 0 ? void 0 : _c.availableShippingMethods]);
    // Compute requiresShipment based on cart items
    const requiresShipment = (0,react.useMemo)(() => {
        // Just return true for now as all products require shipping. We will get back to this when virtual/downloadable products are supported.
        return true;
    }, [(_d = cartState === null || cartState === void 0 ? void 0 : cartState.data) === null || _d === void 0 ? void 0 : _d.items]);
    // Place order with loading state and error handling (original API - expects data already in cart)
    const placeOrder = (0,react.useCallback)(async () => {
        var _a;
        if (!cartId) {
            throw new Error('Cart ID is required to place order');
        }
        dispatch({ type: 'SET_PLACING_ORDER', payload: true });
        const response = await CheckoutContext_retry(() => fetch(placeOrderApi, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart_id: cartId })
        }));
        const json = await response.json();
        if (!response.ok) {
            throw new Error(((_a = json.error) === null || _a === void 0 ? void 0 : _a.message) || _('Failed to place order'));
        }
        dispatch({
            type: 'SET_ORDER_PLACED',
            payload: { orderId: json.data.uuid }
        });
        return json.data;
    }, [placeOrderApi, cartId]);
    // New checkout method with all data submission (cart.checkoutApi)
    const checkout = (0,react.useCallback)(async () => {
        var _a;
        if (!cartId) {
            throw new Error(_('Cart ID is required to checkout'));
        }
        // Trigger form validation
        const isValid = await form.trigger(undefined, {
            shouldFocus: true
        });
        if (!isValid) {
            return;
        }
        disableForm();
        dispatch({ type: 'SET_PLACING_ORDER', payload: true });
        const response = await CheckoutContext_retry(() => {
            var _a;
            return fetch((_a = cartState.data) === null || _a === void 0 ? void 0 : _a.checkoutApi, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cart_id: cartId,
                    ...state.checkoutData
                })
            });
        });
        const json = await response.json();
        if (!response.ok) {
            enableForm();
            dispatch({ type: 'SET_PLACING_ORDER', payload: false });
            throw new Error(((_a = json.error) === null || _a === void 0 ? void 0 : _a.message) || _('Failed to checkout'));
        }
        dispatch({
            type: 'SET_ORDER_PLACED',
            payload: { orderId: json.data.uuid }
        });
        return json.data;
    }, [
        (_e = cartState.data) === null || _e === void 0 ? void 0 : _e.checkoutApi,
        cartId,
        state.checkoutData,
        form,
        enableForm,
        disableForm
    ]);
    // Checkout data management
    const setCheckoutData = (0,react.useCallback)((data) => {
        dispatch({ type: 'SET_CHECKOUT_DATA', payload: data });
    }, []);
    const updateCheckoutData = (0,react.useCallback)((data) => {
        dispatch({ type: 'UPDATE_CHECKOUT_DATA', payload: data });
    }, []);
    const clearCheckoutData = (0,react.useCallback)(() => {
        dispatch({ type: 'CLEAR_CHECKOUT_DATA' });
    }, []);
    // Payment method component registry
    const registerPaymentComponent = (0,react.useCallback)((code, component) => {
        dispatch({
            type: 'REGISTER_PAYMENT_COMPONENT',
            payload: { code, component }
        });
    }, []);
    const contextValue = (0,react.useMemo)(() => ({
        ...state,
        cartId,
        checkoutSuccessUrl,
        requiresShipment,
        form,
        loading: state.loadingStates.placingOrder
    }), [state, cartId, checkoutSuccessUrl, requiresShipment, form]);
    const dispatchMethods = (0,react.useMemo)(() => ({
        placeOrder,
        checkout,
        getPaymentMethods,
        getShippingMethods,
        setCheckoutData,
        updateCheckoutData,
        clearCheckoutData,
        registerPaymentComponent,
        enableForm,
        disableForm
    }), [
        placeOrder,
        checkout,
        getPaymentMethods,
        getShippingMethods,
        setCheckoutData,
        updateCheckoutData,
        clearCheckoutData,
        registerPaymentComponent,
        enableForm,
        disableForm
    ]);
    return (react.createElement(CheckoutDispatchContext.Provider, { value: dispatchMethods },
        react.createElement(CheckoutContext.Provider, { value: contextValue }, children)));
}
const useCheckout = () => {
    const context = (0,react.useContext)(CheckoutContext);
    if (context === undefined) {
        throw new Error('useCheckout must be used within a CheckoutProvider');
    }
    return context;
};
const useCheckoutDispatch = () => {
    const context = (0,react.useContext)(CheckoutDispatchContext);
    if (context === undefined) {
        throw new Error('useCheckoutDispatch must be used within a CheckoutProvider');
    }
    return context;
};
//# sourceMappingURL=CheckoutContext.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/checkout/CheckoutButton.js






function CheckoutButton() {
    const { data: { noShippingRequired, billingAddress } } = useCartState();
    const { form, registeredPaymentComponents } = useCheckout();
    // Watch the selected payment method
    const selectedPaymentMethod = (0,index_esm/* useWatch */.FH)({
        control: form.control,
        name: 'paymentMethod'
    });
    // Get the payment component for the selected method
    const getPaymentComponent = (methodCode) => {
        return registeredPaymentComponents[methodCode] || null;
    };
    // Helper function to render a component safely
    const renderComponent = (component, props) => {
        return component ? react.createElement(component, props) : null;
    };
    // Get the selected payment method component
    const selectedComponent = selectedPaymentMethod
        ? getPaymentComponent(selectedPaymentMethod)
        : null;
    if (noShippingRequired && !billingAddress) {
        return (react.createElement("div", { className: "checkout-button-section mt-6" },
            react.createElement("button", { type: "button", className: "w-full bg-muted text-muted-foreground py-3 px-4 rounded-lg font-medium cursor-not-allowed", disabled: true }, _('Please provide billing address to proceed'))));
    }
    return (react.createElement("div", { className: "checkout-button-section mt-6" }, selectedPaymentMethod && (selectedComponent === null || selectedComponent === void 0 ? void 0 : selectedComponent.checkoutButtonRenderer) ? (
    // Render the custom checkout button for the selected payment method
    renderComponent(selectedComponent.checkoutButtonRenderer, {
        isSelected: true
    })) : (
    // Default checkout button when no payment method is selected or no custom button
    react.createElement(Button_Button, { variant: 'outline', type: "submit", size: 'xl', className: "w-full disabled:opacity-50 disabled:cursor-not-allowed", disabled: !selectedPaymentMethod }, selectedPaymentMethod
        ? _('Complete Order')
        : _('Select a payment method')))));
}
//# sourceMappingURL=CheckoutButton.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/form/EmailField.js







function EmailField({ name, label, error, helperText, required, validation, wrapperClassName, className, defaultValue, prefixIcon, suffixIcon, ...props }) {
    const { control, formState: { errors } } = (0,index_esm/* useFormContext */.xW)();
    const fieldError = getNestedError(name, errors, error);
    const fieldId = `field-${name}`;
    const validationRules = {
        ...validation,
        ...(required &&
            !(validation === null || validation === void 0 ? void 0 : validation.required) && {
            required: _('${field} is required', { field: label || name })
        }),
        pattern: (validation === null || validation === void 0 ? void 0 : validation.pattern) || {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: _('Please enter a valid email address')
        }
    };
    const renderInput = () => (react.createElement(index_esm/* Controller */.xI, { name: name, control: control, defaultValue: defaultValue, rules: validationRules, render: ({ field }) => {
            var _a;
            return (react.createElement(InputGroupInput, { ...field, value: (_a = field.value) !== null && _a !== void 0 ? _a : '', id: fieldId, type: "email", "aria-invalid": fieldError !== undefined ? 'true' : 'false', "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : undefined, ...props }));
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
            suffixIcon && (react.createElement(InputGroupAddon, { align: 'inline-end' }, suffixIcon))),
        fieldError && react.createElement(FieldError, null, fieldError)));
}
//# sourceMappingURL=EmailField.js.map
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/eye.js
var eye = __webpack_require__(3160);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/eye-closed.js
var eye_closed = __webpack_require__(79585);
;// ./node_modules/@evershop/evershop/dist/components/common/form/PasswordField.js








function PasswordField({ name, label, error, helperText, required, minLength = 6, showToggle = false, validation, wrapperClassName, className, defaultValue, prefixIcon, suffixIcon, ...props }) {
    const { control, formState: { errors } } = (0,index_esm/* useFormContext */.xW)();
    const fieldError = getNestedError(name, errors, error);
    const fieldId = `field-${name}`;
    const [showPassword, setShowPassword] = react.useState(false);
    const validationRules = {
        ...validation,
        ...(required &&
            !(validation === null || validation === void 0 ? void 0 : validation.required) && {
            required: _('${field} is required', { field: label || name })
        }),
        minLength: (validation === null || validation === void 0 ? void 0 : validation.minLength) || {
            value: minLength,
            message: _('Password must be at least ${minLength} characters long', {
                minLength: minLength.toString()
            })
        }
    };
    const renderToggleButton = () => showToggle ? (react.createElement("button", { type: "button", className: "transition-colors", onClick: () => setShowPassword(!showPassword), tabIndex: -1 }, showPassword ? (react.createElement(eye/* default */.A, { className: "h-5 w-5" })) : (react.createElement(eye_closed/* default */.A, { className: "h-5 w-5" })))) : null;
    const renderInput = () => (react.createElement(index_esm/* Controller */.xI, { name: name, control: control, defaultValue: defaultValue, rules: validationRules, render: ({ field }) => {
            var _a;
            return (react.createElement(InputGroupInput, { ...field, value: (_a = field.value) !== null && _a !== void 0 ? _a : '', id: fieldId, type: showToggle && showPassword ? 'text' : 'password', "aria-invalid": fieldError !== undefined ? 'true' : 'false', "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : undefined, ...props }));
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
            (suffixIcon || showToggle) && (react.createElement(InputGroupAddon, { align: 'inline-end' }, suffixIcon || renderToggleButton()))),
        fieldError && react.createElement(FieldError, null, fieldError)));
}
//# sourceMappingURL=PasswordField.js.map
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
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/circle-user.js
var circle_user = __webpack_require__(68397);
;// ./node_modules/@evershop/evershop/dist/components/frontStore/checkout/ContactInformation.js












const LoggedIn = ({ uuid, fullName, email }) => {
    const [isLoggingOut, setIsLoggingOut] = (0,react.useState)(false);
    const { logout } = useCustomerDispatch();
    const { updateCheckoutData } = useCheckoutDispatch();
    (0,react.useEffect)(() => {
        updateCheckoutData({
            customer: {
                id: uuid,
                email: email,
                fullName: fullName
            }
        });
    }, [fullName, email]);
    const handleLogout = async () => {
        if (isLoggingOut)
            return;
        try {
            setIsLoggingOut(true);
            await logout();
            react_toastify_esm/* toast */.oR.success(_('Successfully logged out'));
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : _('Logout failed');
            react_toastify_esm/* toast */.oR.error(errorMessage);
        }
        finally {
            setIsLoggingOut(false);
        }
    };
    return (react.createElement(Item, { variant: 'outline' },
        react.createElement(ItemContent, null,
            react.createElement(ItemTitle, null,
                react.createElement("div", { className: "flex items-center space-x-2" },
                    react.createElement("svg", { className: "w-4 h-4 text-primary", fill: "currentColor", viewBox: "0 0 20 20" },
                        react.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" })),
                    react.createElement("span", { className: "text-sm font-medium text-primary" },
                        _('Logged in as'),
                        " ",
                        fullName))),
            react.createElement(ItemDescription, null, email)),
        react.createElement(ItemActions, null,
            react.createElement(Button_Button, { onClick: handleLogout, disabled: isLoggingOut }, isLoggingOut ? _('Logging out...') : _('Logout')))));
};
const Guest = ({ email }) => {
    const [showLogin, setShowLogin] = (0,react.useState)(false);
    const [isLogging, setIsLogging] = (0,react.useState)(false);
    const { login } = useCustomerDispatch();
    const { form } = useCheckout();
    const { updateCheckoutData } = useCheckoutDispatch();
    const contactEmail = form.watch('contact.email', email);
    const handleLoginClick = (e) => {
        e.preventDefault();
        setShowLogin(true);
    };
    (0,react.useEffect)(() => {
        updateCheckoutData({
            customer: {
                email: contactEmail
            }
        });
    }, [contactEmail]);
    const handleLogin = async () => {
        var _a, _b;
        if (isLogging)
            return;
        try {
            setIsLogging(true);
            const isValid = await form.trigger(['contact.email', 'contact.password']);
            if (!isValid) {
                return;
            }
            const formData = form.getValues();
            const loginEmail = (_a = formData === null || formData === void 0 ? void 0 : formData.contact) === null || _a === void 0 ? void 0 : _a.email;
            const password = (_b = formData === null || formData === void 0 ? void 0 : formData.contact) === null || _b === void 0 ? void 0 : _b.password;
            await login({
                email: loginEmail,
                password: password
            }, window.location.href);
            react_toastify_esm/* toast */.oR.success(_('Successfully logged in'));
            setShowLogin(false);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : _('Login failed');
            react_toastify_esm/* toast */.oR.error(errorMessage);
        }
        finally {
            setIsLogging(false);
        }
    };
    const handleCancelLogin = () => {
        setShowLogin(false);
        // Clear password field
        form.setValue('contact.password', '');
    };
    return (react.createElement("div", null,
        react.createElement(EmailField, { defaultValue: email, name: "contact.email", label: _('Email'), required: true, validation: {
                required: _('Email is required')
            }, placeholder: _('Enter your email') }),
        showLogin && (react.createElement("div", { className: "mt-4" },
            react.createElement(PasswordField, { name: "contact.password", label: _('Password'), required: true, validation: {
                    required: _('Password is required')
                }, placeholder: _('Enter your password') }),
            react.createElement("div", { className: "mt-4 flex gap-2" },
                react.createElement(Button_Button, { onClick: handleLogin, disabled: isLogging, className: "disabled:opacity-50 disabled:cursor-not-allowed" }, isLogging ? _('Logging in...') : _('Log in')),
                react.createElement(Button_Button, { variant: 'outline', onClick: handleCancelLogin }, _('Cancel'))))),
        !showLogin && (react.createElement("p", { className: "mt-2" },
            _('Already have an account?'),
            ' ',
            react.createElement("button", { type: "button", onClick: handleLoginClick, className: "underline text-primary hover:cursor-pointer" }, _('Log in'))))));
};
function ContactInformation() {
    const { customer } = useCustomer();
    const { data: cart } = useCartState();
    return (react.createElement("div", { className: "checkout-contact checkout-step" },
        react.createElement(Card, null,
            react.createElement(CardHeader, null,
                react.createElement(CardTitle, null,
                    react.createElement("div", { className: "flex items-center gap-2" },
                        react.createElement(circle_user/* default */.A, { className: "w-5 h-5" }),
                        react.createElement("span", null, _('Contact Information'))))),
            react.createElement(CardContent, null, customer ? (react.createElement(LoggedIn, { fullName: customer.fullName, email: customer.email, uuid: customer.uuid })) : (react.createElement(Guest, { email: cart.customerEmail || '' }))))));
}
//# sourceMappingURL=ContactInformation.js.map
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
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/select/root/SelectRoot.js
var SelectRoot = __webpack_require__(47074);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/select/value/SelectValue.js
var SelectValue = __webpack_require__(47588);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/select/trigger/SelectTrigger.js
var SelectTrigger = __webpack_require__(60856);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/select/icon/SelectIcon.js
var SelectIcon = __webpack_require__(87328);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/select/portal/SelectPortal.js
var SelectPortal = __webpack_require__(13398);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/select/positioner/SelectPositioner.js
var SelectPositioner = __webpack_require__(16146);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/select/popup/SelectPopup.js
var SelectPopup = __webpack_require__(85080);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/select/list/SelectList.js
var SelectList = __webpack_require__(5158);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/select/item/SelectItem.js
var SelectItem = __webpack_require__(95832);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/select/item-text/SelectItemText.js
var SelectItemText = __webpack_require__(4509);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/select/item-indicator/SelectItemIndicator.js
var SelectItemIndicator = __webpack_require__(86059);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/select/scroll-up-arrow/SelectScrollUpArrow.js
var SelectScrollUpArrow = __webpack_require__(58024);
// EXTERNAL MODULE: ./node_modules/@base-ui/react/esm/select/scroll-down-arrow/SelectScrollDownArrow.js
var SelectScrollDownArrow = __webpack_require__(19722);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/chevron-down.js
var chevron_down = __webpack_require__(75107);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/check.js
var check = __webpack_require__(45773);
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/chevron-up.js
var chevron_up = __webpack_require__(72102);
;// ./node_modules/@evershop/evershop/dist/components/common/ui/Select.js
/* unused harmony import specifier */ var SelectPrimitive;
/* unused harmony import specifier */ var Select_cn;
/* unused harmony import specifier */ var Select_React;




const Select = SelectRoot/* SelectRoot */.H;
function SelectGroup({ className, ...props }) {
    return (Select_React.createElement(SelectPrimitive.Group, { "data-slot": "select-group", className: Select_cn('scroll-my-1 p-1', className), ...props }));
}
function Select_SelectValue({ className, ...props }) {
    return (react.createElement(SelectValue/* SelectValue */.y, { "data-slot": "select-value", className: cn('flex flex-1 text-left', className), ...props }));
}
function Select_SelectTrigger({ className, size = 'default', children, ...props }) {
    return (react.createElement(SelectTrigger/* SelectTrigger */.b, { "data-slot": "select-trigger", "data-size": size, className: cn("border-input data-[placeholder]:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 gap-1.5 rounded-md border bg-transparent py-2 pr-2 pl-2.5 text-sm shadow-xs transition-[color,box-shadow] focus-visible:ring-[3px] aria-invalid:ring-[3px] data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:flex *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-4 flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0", className), ...props },
        children,
        react.createElement(SelectIcon/* SelectIcon */.w, { render: react.createElement(chevron_down/* default */.A, { className: "text-muted-foreground size-4 pointer-events-none" }) })));
}
function SelectContent({ className, children, side = 'bottom', sideOffset = 4, align = 'center', alignOffset = 0, alignItemWithTrigger = true, ...props }) {
    return (react.createElement(SelectPortal/* SelectPortal */.V, null,
        react.createElement(SelectPositioner/* SelectPositioner */.l, { side: side, sideOffset: sideOffset, align: align, alignOffset: alignOffset, alignItemWithTrigger: alignItemWithTrigger, className: "isolate z-5000" },
            react.createElement(SelectPopup/* SelectPopup */.t, { "data-slot": "select-content", className: cn('bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 min-w-36 rounded-md shadow-md ring-1 duration-100 relative isolate z-5000 max-h-(--available-height) w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto', className), ...props },
                react.createElement(SelectScrollUpButton, null),
                react.createElement(SelectList/* SelectList */.B, null, children),
                react.createElement(SelectScrollDownButton, null)))));
}
function SelectLabel({ className, ...props }) {
    return (Select_React.createElement(SelectPrimitive.GroupLabel, { "data-slot": "select-label", className: Select_cn('text-muted-foreground px-2 py-1.5 text-xs', className), ...props }));
}
function Select_SelectItem({ className, children, ...props }) {
    return (react.createElement(SelectItem/* SelectItem */.e, { "data-slot": "select-item", className: cn("focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default items-center outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", className), ...props },
        react.createElement(SelectItemText/* SelectItemText */.h, { className: "flex flex-1 gap-2 shrink-0 whitespace-nowrap" }, children),
        react.createElement(SelectItemIndicator/* SelectItemIndicator */.h, { render: react.createElement("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }) },
            react.createElement(check/* default */.A, { className: "pointer-events-none" }))));
}
function SelectSeparator({ className, ...props }) {
    return (Select_React.createElement(SelectPrimitive.Separator, { "data-slot": "select-separator", className: Select_cn('bg-border -mx-1 my-1 h-px pointer-events-none', className), ...props }));
}
function SelectScrollUpButton({ className, ...props }) {
    return (react.createElement(SelectScrollUpArrow/* SelectScrollUpArrow */.w, { "data-slot": "select-scroll-up-button", className: cn("bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4 top-0 w-full", className), ...props },
        react.createElement(chevron_up/* default */.A, null)));
}
function SelectScrollDownButton({ className, ...props }) {
    return (react.createElement(SelectScrollDownArrow/* SelectScrollDownArrow */.d, { "data-slot": "select-scroll-down-button", className: cn("bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4 bottom-0 w-full", className), ...props },
        react.createElement(chevron_down/* default */.A, null)));
}

//# sourceMappingURL=Select.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/form/SelectField.js







function SelectField({ name, label, error, helperText, required, validation, options, placeholder, wrapperClassName, className, defaultValue, disabled, id, onChange: onChangeCallback }) {
    const { control, formState: { errors } } = (0,index_esm/* useFormContext */.xW)();
    const fieldError = getNestedError(name, errors, error);
    const fieldId = id || `field-${name}`;
    const hasDefaultValue = defaultValue !== undefined && defaultValue !== null && defaultValue !== '';
    const validationRules = {
        ...validation,
        ...(required &&
            !(validation === null || validation === void 0 ? void 0 : validation.required) && {
            required: {
                value: true,
                message: _('${field} is required', { field: label || name })
            },
            validate: {
                ...validation === null || validation === void 0 ? void 0 : validation.validate,
                notEmpty: (value) => {
                    if (required &&
                        (value === '' || value === null || value === undefined)) {
                        return _('${field} is required', { field: label || name });
                    }
                    return true;
                }
            }
        })
    };
    return (react.createElement(Field, { "data-invalid": fieldError ? 'true' : 'false', className: wrapperClassName },
        label && (react.createElement(FieldLabel, { htmlFor: fieldId },
            react.createElement(react.Fragment, null,
                label,
                required && react.createElement("span", { className: "text-destructive" }, "*"),
                helperText && react.createElement(Tooltip, { content: helperText, position: "top" })))),
        react.createElement(index_esm/* Controller */.xI, { name: name, control: control, rules: validationRules, defaultValue: hasDefaultValue ? defaultValue : '', render: ({ field }) => {
                var _a;
                return (react.createElement(Select, { value: options.find((o) => o.value === field.value), onValueChange: (value) => {
                        const newValue = (value === null || value === void 0 ? void 0 : value.value) === '' ? '' : value === null || value === void 0 ? void 0 : value.value;
                        field.onChange(newValue);
                        if (onChangeCallback && value !== null) {
                            onChangeCallback(value.value);
                        }
                    }, disabled: disabled },
                    react.createElement(Select_SelectTrigger, { id: fieldId, className: className, "aria-invalid": fieldError !== undefined ? 'true' : 'false', "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : undefined },
                        react.createElement(Select_SelectValue, null, ((_a = options.find((o) => String(o.value) === String(field.value))) === null || _a === void 0 ? void 0 : _a.label) || placeholder)),
                    react.createElement(SelectContent, null,
                        placeholder && (react.createElement(Select_SelectItem, { value: "", disabled: true }, placeholder)),
                        options.map((option) => (react.createElement(Select_SelectItem, { key: option.value, value: option, disabled: option.disabled }, option.label))))));
            } }),
        fieldError && react.createElement(FieldError, null, fieldError)));
}
//# sourceMappingURL=SelectField.js.map
;// ./node_modules/@evershop/evershop/dist/components/common/form/TelField.js







function TelField({ name, label, error, wrapperClassName, helperText, required, validation, className, defaultValue, prefixIcon, suffixIcon, ...props }) {
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
    const inputClassName = `${fieldError !== undefined ? 'error' : ''} ${className || ''} ${prefixIcon ? '!pl-10' : ''} ${suffixIcon ? '!pr-10' : ''}`.trim();
    const renderInput = () => (react.createElement(index_esm/* Controller */.xI, { name: name, control: control, defaultValue: defaultValue, rules: validationRules, render: ({ field }) => {
            var _a;
            return (react.createElement(InputGroupInput, { ...field, value: (_a = field.value) !== null && _a !== void 0 ? _a : '', id: fieldId, type: "tel", className: inputClassName, "aria-invalid": fieldError !== undefined ? 'true' : 'false', "aria-describedby": fieldError !== undefined ? `${fieldId}-error` : undefined, ...props }));
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
            suffixIcon && (react.createElement(InputGroupAddon, { align: 'inline-end' }, suffixIcon))),
        fieldError && react.createElement(FieldError, null, fieldError)));
}
//# sourceMappingURL=TelField.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/customer/address/addressForm/NameAndTelephone.js




function NameAndTelephone({ fullName, telephone, getFieldName }) {
    return (react.createElement("div", { className: "grid grid-cols-2 gap-2" },
        react.createElement("div", null,
            react.createElement(InputField, { name: getFieldName ? getFieldName('full_name') : 'full_name', defaultValue: fullName, label: _('Full name'), placeholder: _('Full name'), required: true, validation: {
                    required: _('Full name is required')
                } })),
        react.createElement("div", null,
            react.createElement(TelField, { name: getFieldName ? getFieldName('telephone') : 'telephone', defaultValue: telephone, label: _('Telephone'), placeholder: _('Telephone'), required: true, validation: {
                    required: _('Telephone is required')
                } }))));
}
//# sourceMappingURL=NameAndTelephone.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/customer/address/addressForm/ProvinceAndPostcode.js




function ProvinceAndPostcode({ provinces, province, postcode, getFieldName }) {
    return (react.createElement("div", { className: "grid grid-cols-2 gap-2 mt-2" },
        react.createElement("div", null,
            react.createElement(SelectField, { defaultValue: province === null || province === void 0 ? void 0 : province.code, name: getFieldName ? getFieldName('province') : 'address.province', label: _('Province'), placeholder: _('Province'), required: true, validation: {
                    required: _('Province is required')
                }, options: provinces })),
        react.createElement("div", null,
            react.createElement(InputField, { name: getFieldName ? getFieldName('postcode') : 'postcode', defaultValue: postcode, label: _('Postcode'), placeholder: _('Postcode'), required: true, validation: {
                    required: _('Postcode is required')
                } }))));
}
//# sourceMappingURL=ProvinceAndPostcode.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/customer/address/addressForm/AddressForm.js








function CustomerAddressForm({ allowCountries = [], address = {}, areaId = 'customerAddressForm', fieldNamePrefix = 'address' }) {
    var _a, _b, _c;
    const { watch, setValue } = (0,index_esm/* useFormContext */.xW)();
    const getFieldName = (fieldName) => {
        return fieldNamePrefix ? `${fieldNamePrefix}.${fieldName}` : fieldName;
    };
    const selectedCountry = watch(getFieldName('country'), ((_a = address === null || address === void 0 ? void 0 : address.country) === null || _a === void 0 ? void 0 : _a.code) || '');
    return (react.createElement(common_Area, { id: areaId, className: "space-y-3", coreComponents: [
            {
                component: {
                    default: (react.createElement(NameAndTelephone, { fullName: (address === null || address === void 0 ? void 0 : address.fullName) || '', telephone: (address === null || address === void 0 ? void 0 : address.telephone) || '', getFieldName: getFieldName }))
                },
                sortOrder: 10
            },
            {
                component: {
                    default: (react.createElement(InputField, { name: getFieldName('address_1'), label: _('Address'), placeholder: _('Address'), defaultValue: (address === null || address === void 0 ? void 0 : address.address1) || '', required: true, validation: {
                            required: _('Address is required')
                        } }))
                },
                sortOrder: 20
            },
            {
                component: {
                    default: (react.createElement(InputField, { name: getFieldName('address_2'), label: _('Address 2'), placeholder: _('Address 2'), defaultValue: (address === null || address === void 0 ? void 0 : address.address2) || '' }))
                },
                sortOrder: 30
            },
            {
                component: {
                    default: (react.createElement(InputField, { name: getFieldName('city'), label: _('City'), placeholder: _('City'), required: true, validation: { required: _('City is required') }, defaultValue: (address === null || address === void 0 ? void 0 : address.city) || '' }))
                },
                sortOrder: 40
            },
            {
                component: {
                    default: (react.createElement(SelectField, { defaultValue: ((_b = address === null || address === void 0 ? void 0 : address.country) === null || _b === void 0 ? void 0 : _b.code) || '', label: _('Country'), name: getFieldName('country'), placeholder: _('Country'), onChange: (value) => {
                            setValue(getFieldName('country'), value);
                            setValue(getFieldName('province'), '');
                        }, required: true, validation: { required: _('Country is required') }, options: allowCountries }))
                },
                sortOrder: 50
            },
            {
                component: {
                    default: (react.createElement(ProvinceAndPostcode, { provinces: ((_c = allowCountries.find((country) => country.value === selectedCountry)) === null || _c === void 0 ? void 0 : _c.provinces) || [], province: (address === null || address === void 0 ? void 0 : address.province) || { code: '' }, postcode: (address === null || address === void 0 ? void 0 : address.postcode) || '', getFieldName: getFieldName }))
                },
                sortOrder: 60
            }
        ] }));
}
//# sourceMappingURL=AddressForm.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/customer/address/addressForm/AddressFormLoadingSkeleton.js


function AddressFormLoadingSkeleton() {
    return (react.createElement("div", { className: "address-loading-skeleton" },
        react.createElement("div", { className: "grid gap-5 grid-cols-2" },
            react.createElement("div", { className: "skeleton" }),
            react.createElement("div", { className: "skeleton" })),
        react.createElement("div", { className: "skeleton" }),
        react.createElement("div", { className: "skeleton" }),
        react.createElement("div", { className: "skeleton" }),
        react.createElement("div", { className: "grid gap-5 grid-cols-2" },
            react.createElement("div", { className: "skeleton" }),
            react.createElement("div", { className: "skeleton" }))));
}
//# sourceMappingURL=AddressFormLoadingSkeleton.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/customer/address/addressForm/Index.js




const CountriesQuery = `
  query Country {
    allowedCountries  {
      value: code
      label: name
      provinces {
        label: name
        value: code
      }
    }
  }
`;
function Index({ address = {}, areaId = 'customerAddressForm', fieldNamePrefix = 'address' }) {
    const [result] = (0,urql_es/* useQuery */.IT)({
        query: CountriesQuery
    });
    const { data, fetching, error } = result;
    if (fetching)
        return react.createElement(AddressFormLoadingSkeleton, null);
    if (error) {
        return react.createElement("p", { className: "text-destructive" }, error.message);
    }
    return (react.createElement(CustomerAddressForm, { address: address, areaId: areaId, allowCountries: data.allowedCountries, fieldNamePrefix: fieldNamePrefix }));
}
//# sourceMappingURL=Index.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/checkout/payment/BillingAddress.js









function BillingAddress({ billingAddress, addBillingAddress, addingBillingAddress, noShippingRequired }) {
    const { form, checkoutData } = useCheckout();
    const { updateCheckoutData } = useCheckoutDispatch();
    const { setValue, getValues, trigger, formState: { disabled } } = form;
    const shippingAddress = (0,index_esm/* useWatch */.FH)({
        control: form.control,
        name: 'shippingAddress'
    });
    const billingAddressField = (0,index_esm/* useWatch */.FH)({
        control: form.control,
        name: 'billingAddress'
    });
    const [useSameAddress, setUseSameAddress] = (0,react.useState)(!noShippingRequired);
    (0,react.useEffect)(() => {
        if (useSameAddress && shippingAddress) {
            updateCheckoutData({ billingAddress: shippingAddress });
        }
        else if (!useSameAddress) {
            setValue('billingAddress', billingAddress);
        }
    }, [useSameAddress, checkoutData.shippingAddress]);
    (0,react.useEffect)(() => {
        if (!useSameAddress) {
            const billingAddress = { ...getValues('billingAddress') };
            updateCheckoutData({ billingAddress });
        }
    }, [billingAddressField]);
    const handleAddressOptionChange = (value) => {
        const isSameAddress = value === 'same';
        if (isSameAddress === useSameAddress || disabled) {
            return;
        }
        setUseSameAddress(isSameAddress);
        if (!isSameAddress) {
            updateCheckoutData({ billingAddress: undefined });
        }
        else if (checkoutData.shippingAddress) {
            updateCheckoutData({ billingAddress: checkoutData.shippingAddress });
        }
    };
    const handleGoToPayment = async () => {
        const isValid = await trigger('billingAddress');
        if (isValid && addBillingAddress) {
            const billingAddressData = getValues('billingAddress');
            await addBillingAddress(billingAddressData);
        }
    };
    return (react.createElement("div", { className: "billing-address-section" },
        react.createElement(Item, { className: "py-0 px-0" },
            react.createElement(ItemContent, { className: "gap-2" },
                react.createElement(ItemTitle, null, _('Billing Address')),
                react.createElement(RadioGroup_RadioGroup, { value: useSameAddress ? 'same' : 'different', onValueChange: (value) => {
                        handleAddressOptionChange(value);
                    } }, !noShippingRequired ? (react.createElement(react.Fragment, null,
                    react.createElement(Item, { variant: 'outline' },
                        react.createElement(ItemContent, null,
                            react.createElement(ItemTitle, null,
                                react.createElement("div", { className: "flex items-center space-x-3" },
                                    react.createElement(RadioGroupItem, { id: "same-address", value: "same" }),
                                    react.createElement(Label, { htmlFor: "same-address" }, _('Same as shipping address')))))),
                    react.createElement(Item, { variant: 'outline' },
                        react.createElement(ItemContent, null,
                            react.createElement(ItemTitle, null,
                                react.createElement("div", { className: "flex items-center space-x-3" },
                                    react.createElement(RadioGroupItem, { id: "different-address", value: "different" }),
                                    react.createElement(Label, { htmlFor: "different-address" }, _('Use a different billing address')))),
                            !useSameAddress && (react.createElement(ItemDescription, { className: "text-inherit mt-3 overflow-visible" },
                                react.createElement("div", { className: "text-inherit bg-white" },
                                    react.createElement(Index, { areaId: "checkoutBillingAddressForm", fieldNamePrefix: "billingAddress", address: undefined }),
                                    noShippingRequired && (react.createElement(Button_Button, { onClick: () => handleGoToPayment(), variant: "default", isLoading: addingBillingAddress }, _('Continue to payment')))))))))) : (react.createElement(ItemDescription, { className: "text-inherit mt-3 overflow-visible" },
                    react.createElement("div", { className: "text-inherit bg-white" },
                        react.createElement(Index, { areaId: "checkoutBillingAddressForm", fieldNamePrefix: "billingAddress", address: undefined }),
                        noShippingRequired && (react.createElement(Button_Button, { onClick: () => handleGoToPayment(), variant: "default", isLoading: addingBillingAddress, className: "mt-4" }, _('Continue to payment')))))))))));
}
//# sourceMappingURL=BillingAddress.js.map
;// ./node_modules/@evershop/evershop/dist/components/frontStore/checkout/payment/PaymentMethods.js







// Skeleton component for loading state
function PaymentMethodSkeleton() {
    return (react.createElement("div", { className: "payment-method-skeleton" }, [1, 2, 3, 4].map((index) => (react.createElement("div", { key: index, className: "border border-border rounded-lg p-4 mb-3 animate-pulse" },
        react.createElement("div", { className: "flex items-center justify-between" },
            react.createElement("div", { className: "flex items-center space-x-3" },
                react.createElement(Skeleton, { className: "w-4 h-4" }),
                react.createElement("div", { className: "space-y-2" },
                    react.createElement(Skeleton, { className: "h-4 w-20" }),
                    react.createElement(Skeleton, { className: "h-3 w-40" }))),
            react.createElement("div", { className: "text-right space-y-1" },
                react.createElement(Skeleton, { className: "h-3 w-12" }),
                react.createElement(Skeleton, { className: "h-4 w-16" }))))))));
}
function PaymentMethods({ methods, isLoading }) {
    var _a, _b;
    const { form, registeredPaymentComponents } = useCheckout();
    const { formState, watch, setValue } = form;
    const selectedPaymentMethod = watch('paymentMethod');
    const getPaymentComponent = (methodCode) => {
        return registeredPaymentComponents[methodCode] || null;
    };
    const renderComponent = (component, props) => {
        return component ? react.createElement(component, props) : null;
    };
    return (react.createElement("div", { className: "checkout-payment-methods mt-6" },
        react.createElement(Item, { className: "px-0 py-0" },
            react.createElement(ItemContent, { className: "gap-2" },
                react.createElement(ItemTitle, null, _('Pick a payment method')),
                react.createElement(ItemDescription, null, isLoading ? (react.createElement(PaymentMethodSkeleton, null)) : (react.createElement(react.Fragment, null,
                    react.createElement("div", { className: "payment-methods-list" }, (methods === null || methods === void 0 ? void 0 : methods.length) === 0 ? (react.createElement("div", { className: "text-muted-foreground text-center py-8" },
                        react.createElement("div", { className: "mb-2" }, _('No payment methods available')))) : (react.createElement(RadioGroup_RadioGroup, { value: selectedPaymentMethod, onValueChange: (value) => {
                            setValue('paymentMethod', value);
                        } }, methods.map((method) => {
                        const isSelected = selectedPaymentMethod === method.code;
                        const component = getPaymentComponent(method.code);
                        return (react.createElement(Item, { key: method.code, variant: 'outline', className: isSelected ? 'border-primary' : '' },
                            react.createElement(ItemContent, null,
                                react.createElement(ItemTitle, { className: "w-full" },
                                    react.createElement("div", { className: "flex items-center space-x-3 w-full" },
                                        react.createElement(RadioGroupItem, { id: `payment-method-${method.code}`, value: method.code }),
                                        react.createElement(Label, { htmlFor: `payment-method-${method.code}`, className: "w-full" }, (component === null || component === void 0 ? void 0 : component.nameRenderer)
                                            ? renderComponent(component.nameRenderer, {
                                                isSelected
                                            })
                                            : _(method.name)))),
                                (component === null || component === void 0 ? void 0 : component.formRenderer) && isSelected && (react.createElement(ItemDescription, { className: "text-inherit overflow-visible" }, renderComponent(component.formRenderer, {
                                    isSelected
                                }))))));
                    })))),
                    formState.errors.paymentMethod && (react.createElement("div", { className: "text-destructive text-sm mt-2" }, ((_b = (_a = formState.errors.paymentMethod) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.toString()) ||
                        _('Please select a payment method'))))))))));
}
//# sourceMappingURL=PaymentMethods.js.map
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/credit-card.js
var credit_card = __webpack_require__(50211);
;// ./node_modules/@evershop/evershop/dist/components/frontStore/checkout/Payment.js










function Payment() {
    const { data: { noShippingRequired, billingAddress, availablePaymentMethods }, loadingStates: { addingBillingAddress } } = useCartState();
    const { addBillingAddress } = useCartDispatch();
    const { updateCheckoutData } = useCheckoutDispatch();
    const { form } = useCheckout();
    const paymentMethod = (0,index_esm/* useWatch */.FH)({
        name: 'paymentMethod',
        control: form.control
    });
    (0,react.useEffect)(() => {
        const updatePaymentMethod = async () => {
            try {
                const paymentMethod = form.getValues('paymentMethod');
                const methodDetails = availablePaymentMethods === null || availablePaymentMethods === void 0 ? void 0 : availablePaymentMethods.find((method) => method.code === paymentMethod);
                if (!methodDetails) {
                    throw new Error('Please select a valid payment method');
                }
                updateCheckoutData({ paymentMethod: methodDetails.code });
            }
            catch (error) {
                react_toastify_esm/* toast */.oR.error(error instanceof Error
                    ? error.message
                    : _('Failed to update shipment'));
            }
        };
        if (paymentMethod) {
            updatePaymentMethod();
        }
    }, [paymentMethod]);
    return (react.createElement("div", { className: "checkout__payment space-y-6 mt-6" },
        react.createElement(Card, null,
            react.createElement(CardHeader, null,
                react.createElement(CardTitle, null,
                    react.createElement("div", { className: "flex items-center gap-2" },
                        react.createElement(credit_card/* default */.A, { className: "w-5 h-5" }),
                        react.createElement("span", null, _('Payment Information'))))),
            react.createElement(CardContent, null,
                react.createElement(BillingAddress, { billingAddress: billingAddress, addBillingAddress: addBillingAddress, addingBillingAddress: addingBillingAddress, noShippingRequired: noShippingRequired }),
                (billingAddress || noShippingRequired === false) && (react.createElement(PaymentMethods, { methods: availablePaymentMethods === null || availablePaymentMethods === void 0 ? void 0 : availablePaymentMethods.map((method) => ({
                        ...method
                    })), isLoading: addingBillingAddress }))))));
}
//# sourceMappingURL=Payment.js.map
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/package.js
var icons_package = __webpack_require__(17133);
;// ./node_modules/@evershop/evershop/dist/components/frontStore/checkout/shipment/ShippingMethods.js








// Skeleton component for loading state
function ShippingMethodSkeleton() {
    return (react.createElement("div", { className: "shipping-method-skeleton" }, [1, 2, 3, 4].map((index) => (react.createElement("div", { key: index, className: "border border-gray-200 rounded-lg p-4 mb-3 animate-pulse" },
        react.createElement("div", { className: "flex items-center justify-between" },
            react.createElement("div", { className: "flex items-center space-x-3" },
                react.createElement("div", { className: "w-4 h-4 bg-gray-200 rounded-full" }),
                react.createElement("div", { className: "space-y-2" },
                    react.createElement("div", { className: "h-4 bg-gray-200 rounded w-20" }),
                    react.createElement("div", { className: "h-3 bg-gray-200 rounded w-40" }))),
            react.createElement("div", { className: "text-right space-y-1" },
                react.createElement("div", { className: "h-3 bg-gray-200 rounded w-12" }),
                react.createElement("div", { className: "h-4 bg-gray-200 rounded w-16" }))))))));
}
function ShippingMethods({ methods, shippingAddress, isLoading, onSelect }) {
    var _a, _b;
    const { form } = useCheckout();
    const { formState, setValue, watch } = form;
    const [isProcessing, setIsProcessing] = react.useState(false);
    const currentValue = watch('shippingMethod');
    const handleMethodSelect = async (method) => {
        if (!onSelect) {
            // If no onSelect function provided, allow normal behavior
            setValue('shippingMethod', method.code);
            return;
        }
        if (isProcessing || formState.disabled) {
            return;
        }
        try {
            setIsProcessing(true);
            const result = await Promise.resolve(onSelect(method));
            if (result) {
                // Only update the form value if onSelect returns true
                setValue('shippingMethod', method.code);
            }
            // If result is false, keep the current selection
        }
        catch (error) {
            // Keep the current selection on error
        }
        finally {
            setIsProcessing(false);
        }
    };
    return (react.createElement("div", { className: "checkout-shipment" },
        react.createElement(Card, null,
            react.createElement(CardHeader, null,
                react.createElement(CardTitle, null,
                    react.createElement("div", { className: "flex items-center gap-2" },
                        react.createElement(icons_package/* default */.A, { className: "w-5 h-5" }),
                        react.createElement("span", null, _('Shipping Method'))))),
            react.createElement(CardContent, null, isLoading ? (react.createElement(ShippingMethodSkeleton, null)) : (react.createElement(react.Fragment, null,
                react.createElement("div", { className: "shipping-methods-list" },
                    react.createElement("input", { type: "hidden", ...form.register('shippingMethod', { required: true }), defaultValue: currentValue }),
                    (methods === null || methods === void 0 ? void 0 : methods.length) === 0 ? (react.createElement("div", { className: "text-left" }, !(shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.country) || !(shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.province) ? (react.createElement("div", null,
                        react.createElement("div", { className: "text-sm" }, _('Available shipping methods will appear once you provide your address details')))) : (react.createElement("div", null,
                        react.createElement("div", { className: "mb-2" }, _('No shipping methods available')),
                        react.createElement("div", { className: "text-sm" }, _('No shipping options are available for your location')))))) : (react.createElement(RadioGroup_RadioGroup, { value: currentValue, onValueChange: (value) => {
                            const method = methods.find((m) => m.code === value);
                            if (method) {
                                handleMethodSelect(method);
                            }
                            else {
                                setValue('shippingMethod', value);
                            }
                        } }, methods.map((method) => (react.createElement(Item, { key: method.code, className: `cursor-pointer transition-colors ${currentValue === method.code
                            ? 'border-primary bg-primary-foreground/10 hover:border-primary'
                            : 'border-border'} ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}` },
                        react.createElement(ItemContent, null,
                            react.createElement(ItemTitle, null,
                                react.createElement("div", { className: "flex items-center gap-2" },
                                    react.createElement(RadioGroupItem, { id: `shipping-method-${method.code}`, value: method.code, onChange: () => {
                                            !isProcessing && handleMethodSelect(method);
                                        }, disabled: isProcessing }),
                                    react.createElement(Label, { htmlFor: `shipping-method-${method.code}` }, method.name))),
                            method.description && (react.createElement(ItemDescription, null, method.description))),
                        react.createElement(ItemActions, null, method.cost ? (react.createElement(react.Fragment, null, method.cost.value > 0 ? (react.createElement("div", { className: "font-medium" }, method.cost.text)) : (react.createElement(react.Fragment, null,
                            react.createElement("div", { className: "text-sm text-gray-500 line-through" }, method.cost.text),
                            react.createElement("div", { className: "font-medium text-primary" }, _('FREE')))))) : (react.createElement("div", { className: "font-medium text-gray-900" }, _('Contact for pricing')))))))))),
                formState.errors.shippingMethod && (react.createElement("div", { className: "text-destructive text-sm mt-2" }, ((_b = (_a = formState.errors.shippingMethod) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.toString()) ||
                    _('Please select a shipping method')))))))));
}
//# sourceMappingURL=ShippingMethods.js.map
// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/map-pin.js
var map_pin = __webpack_require__(76069);
;// ./node_modules/@evershop/evershop/dist/components/frontStore/checkout/Shipment.js










function Shipment() {
    var _a, _b;
    const { data: { shippingAddress, noShippingRequired, availableShippingMethods, shippingMethod: selectedShippingMethod }, loadingStates: { fetchingShippingMethods } } = useCartState();
    // Early return if no shipping is required
    if (noShippingRequired) {
        return null;
    }
    const { addShippingAddress, addShippingMethod, fetchAvailableShippingMethods } = useCartDispatch();
    const { form } = useCheckout();
    const { updateCheckoutData } = useCheckoutDispatch();
    // Use useWatch for better performance and cleaner code
    const watchedShippingAddress = (0,index_esm/* useWatch */.FH)({
        control: form.control,
        name: 'shippingAddress'
    });
    const dirtyFields = form.formState.dirtyFields;
    const debounceTimeoutRef = (0,react.useRef)(null);
    const lastFetchParamsRef = (0,react.useRef)(
    // Initialize with current shipping address if available
    shippingAddress
        ? {
            country: (_a = shippingAddress.country) === null || _a === void 0 ? void 0 : _a.code,
            province: (_b = shippingAddress.province) === null || _b === void 0 ? void 0 : _b.code,
            postcode: shippingAddress.postcode || undefined
        }
        : null);
    (0,react.useEffect)(() => {
        const fetchShippingMethods = async () => {
            try {
                const country = form.getValues('shippingAddress.country');
                const province = form.getValues('shippingAddress.province');
                const postcode = form.getValues('shippingAddress.postcode');
                if (!country) {
                    return;
                }
                // Check if parameters have actually changed
                const currentParams = { country, province, postcode };
                const lastParams = lastFetchParamsRef.current;
                if (lastParams &&
                    lastParams.country === country &&
                    lastParams.province === province &&
                    lastParams.postcode === postcode) {
                    // Parameters haven't changed, skip API call
                    return;
                }
                // Cache the current parameters
                lastFetchParamsRef.current = currentParams;
                await fetchAvailableShippingMethods({ country, province, postcode });
            }
            catch (error) {
                react_toastify_esm/* toast */.oR.error(error instanceof Error
                    ? error.message
                    : _('Failed to update shipment'));
            }
        };
        if (watchedShippingAddress && dirtyFields.shippingAddress) {
            // Clear existing timeout
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
            // Set new timeout
            debounceTimeoutRef.current = setTimeout(() => {
                fetchShippingMethods();
            }, 800);
        }
        // Cleanup function
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [watchedShippingAddress, dirtyFields.shippingAddress]); // Clean dependency array
    const updateShipment = async (method) => {
        try {
            const validate = await form.trigger('shippingAddress');
            if (!validate) {
                return false;
            }
            const shippingAddress = form.getValues('shippingAddress');
            await addShippingAddress(shippingAddress);
            await addShippingMethod(method.code, method.name);
            updateCheckoutData({ shippingAddress, shippingMethod: method.code });
            return true;
        }
        catch (error) {
            react_toastify_esm/* toast */.oR.error(error instanceof Error ? error.message : _('Failed to update shipment'));
            return false;
        }
    };
    return (react.createElement("div", { className: "checkout__shipment space-y-6 mt-6" },
        react.createElement(Card, { className: "transition-all overflow-hidden duration-200" },
            react.createElement(CardHeader, null,
                react.createElement(CardTitle, null,
                    react.createElement("div", { className: "flex items-center gap-2" },
                        react.createElement(map_pin/* default */.A, { className: "w-5 h-5" }),
                        react.createElement("span", null, _('Shipping Address'))))),
            react.createElement(CardContent, null,
                react.createElement(Index, { areaId: "checkoutShippingAddressForm", fieldNamePrefix: "shippingAddress", address: shippingAddress }))),
        react.createElement(ShippingMethods, { methods: availableShippingMethods === null || availableShippingMethods === void 0 ? void 0 : availableShippingMethods.map((method) => ({
                ...method,
                isSelected: method.code === selectedShippingMethod
            })), shippingAddress: shippingAddress, onSelect: updateShipment, isLoading: fetchingShippingMethods })));
}
//# sourceMappingURL=Shipment.js.map
;// ./node_modules/@evershop/evershop/dist/modules/checkout/pages/frontStore/checkout/Checkout.js













function CheckoutPage({ placeOrderApi, checkoutSuccessUrl }) {
    const [disabled, setDisabled] = react.useState(false);
    const form = (0,index_esm/* useForm */.mN)({
        disabled: disabled,
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        defaultValues: {}
    });
    return (react.createElement(CheckoutProvider, { form: form, enableForm: () => setDisabled(false), disableForm: () => setDisabled(true), allowGuestCheckout: true, placeOrderApi: placeOrderApi, checkoutSuccessUrl: checkoutSuccessUrl },
        react.createElement("div", { className: "page-width grid grid-cols-1 md:grid-cols-2 gap-7 pt-8 pb-8" },
            react.createElement(Form, { form: form, submitBtn: false },
                react.createElement("div", null,
                    react.createElement(ContactInformation, null),
                    react.createElement(Shipment, null),
                    react.createElement(Payment, null),
                    react.createElement(CheckoutButton, null)),
                react.createElement(common_Area, { id: "checkoutForm", noOuter: true })),
            react.createElement("div", null,
                react.createElement(CartItems, null, ({ items, loading, showPriceIncludingTax }) => (react.createElement(CartSummaryItemsList, { items: items, loading: loading, showPriceIncludingTax: showPriceIncludingTax }))),
                react.createElement(CartTotalSummary, null)))));
}
const Checkout_layout = {
    areaId: 'content',
    sortOrder: 10
};
const Checkout_query = (/* unused pure expression or super */ null && (`
  query Query {
    placeOrderApi: url(routeId: "createOrder")
    checkoutSuccessUrl: url(routeId: "checkoutSuccess")
  }
`));
//# sourceMappingURL=Checkout.js.map
;// ./node_modules/@evershop/evershop/dist/modules/cod/pages/frontStore/checkout/CashOnDelivery.js





function CODLogo({ width = 100, height = 30 }) {
    return (react.createElement("img", { width: width, height: height, src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ4AAAAvCAYAAAASE3OrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABKuSURBVHgB7V19cFXXcd9z75PEhywJECCDwcYhbieGQNJJXQMztpsP17Q2ePpHIR0ct3UGYtczbhKTJuBxM2PaAnY9jZ0GyHSmIbahfziBTOIY7EySGUP8n42Fk7EN4kNSJCEZJPEkJL2Pk909u+ee+yTIx8Qe3eQt83jvne/7zu/u7tn9XTAwgZy6bm0T5Ev3GrC3gLHLwZrroCpV+R3lur7vm8qyXGXBqdl33mvypScBbBMXWANVqcrvW1LAO9N855PW2oegKlV5jyXSDww6qIKuKu+PMPDIvFZBV5X3U9iBOz37zlNg7XWQZTF4Kda6K7KVdROUXXGsK7S/3Dy/UR9tJN//SOSlXMttlWURabssgo62jc49vH28j9adg8aBzqT3mL5LH9B3+czjCSZ0bN/WTHDIojKtqwThuNXKGq28QzBmOE44jwnnMfCHBNWcsbAGsiICLNqAmiXXQ27hbCgNDMHwkVa3b6yIjNsn2aWaGxeBaZzOHS9hOx2G30UDmYbpON4iHreM440cb/P9c431UIdz0TxjVA4ONFRfi30iHHsUy8uDQ7wwGpMhEii3+Jq5EONa6WuxvQfGzp7j6kjWUnsjjTMNxznF81upi3BdtTh3eSDPc+jKjVt8prVmDkx5eVZCJvQ716/7OMzc9lneFJUCbmbPlj0w9MNXIcbvkQCwZuFcmPfj//bt2tf8KwwfbcU2BtvQNZehaeMaaNr86XHjncW2xfZzUH/HTTD3qX9BcL8BnWu/zGCKGNwGZu/9CtQsmMvlBOooMKGEi3jhHGj+2kMwZeXS1HVc2H0A+nY8C6XBYe4z97H7YCq26d99EM5t3cNrL2O7Bpx7Ds5NY/PcODkDUkBnflsXYhJJlJngMP7K9es/Ds1PPcQgySMQ3t13GIaPn+TNv2bvI1Cz4kYYs2Uo4G6U8VWL30OZsvomGLUlGMPaIr4YxI85EPft+i507/g2jJ7t4fEIbDRWUc0kvgq42UV6Yd+SLftxqYzmLFA5OJNfxg4tB/6dQUfa8sK+l6D/haPcfsbGtTj+53EtZe6j2KGbYAqCbQzXSOU6A7UoSFsavySmOstuYgRZEHahLDQ9vJ6/9u3+LryzZjO0/fPj8OYtn4NeBCDJLNxQBpUA5qp1n+Dy87jpJDPXfRJGsJ7AR/VkXkkGXvgZtG/dBWe374XWWzfB4CvH3GbzRrvtp79HBRC08aVA1RAQC1Qn5WXRzDkE8BgC+a3b7se17oS3NzwKrbds4j4Nq29GUC5h8NlgrPkIyGLjVC4vytxU667LAV9bm2wYqgklG8Ajs3nj9byRJD1oqgrgwEWvTtRUbQ8+Duf2H2bAlLBNvGAOmy+Sjh17oYh+Uoz+2tQVS532oBeWkdRju0YEqUV/bWRgEI6v+QL8/K4vMsBU61jrgKhaqlCh8cZ43jLPXxZtSjL4w6Nw6WwXFEkL4mvozZMweOQY1xH4SKuqzhs9281rXLT3UdF6qm3ddRatjm9TYM2iZAR4wM43CWmQYdzIkvg4Mf5VxDIyZRdRczmxME1AdxFN8jBuaPe+Q/x9xuoVHrB9ew7weLTZ1z/9MNzUdgCW/3QPzF7/qeTULPvbsGoZ/Pm7L8HH3j0My/oOwdK+F9kkk5SMmECBAx8OGp3PmG89iXM58JCCyuFPTmvia0ITXwxMbceu52EE19qwchk0b7qbAc1Xg2+saY0N1mQy69+RZAJ4NjAv6tu4k5+h0xHUmhjqTAS1WFKDLypvFDPbi4AjkPW+8Ap/b1l/O2tE2u6x/jz84qOfgZP3fJXNNW16/ZIPwAef3gyLEYg+nIJCGrMfTXD/K6/DAL6TOS6KxixZSPwuAZ8CryzrN4iYGFeWkzVDeD3yeQzHO7bhEf68cPM9UItaW9vo+GWOB9rkZJtRyUEWBH/fAoYgSOrwpEqn1RKCxGkQA9MRLI1ktvA0emH/y1CL9dNXfpjbkyajlwqFRxqwjk6K9Uuv5+8X0fT1/eAV1lik7Qh49E4mWvVRvvUEHEMTzOEXBBGdLD/22rPcX01fOTiIjLS2sUachuEQBiJpZzD8qpe1jaC2rVRaQzjP21u+DjdsewCu/dJnZDwrZt8mMUeN1WRUMmNqKcQxLCbq2m2b0DxOd3EzfJ+PJ9DmzX/vzCtuUP1f3cztyGfqee4QdD/3InTh6xJ+J5m1eiVrwfnbNsIHD+6AORvvZiDRa0DmIClVelJBqMRpnPQaSdNqUmPw/1/msmYEMN0YarKb8QCkN0Xf/pdS/d24BjrR5PaLH8jTAvmHoW9npDzLcbwsiGxmz9ZvwsID/wkzETjLfrIYRtu7cVMXMwjJV+va8Qyb0ab1zrHv2vUd6Nj9HQ59EIhmrFoOH/nek2xuT235HziP4Q3yp+Zt3gBXIRjI1M5YvYr70udh9reSzXXBYadlYxN53MUubO0gIeYv/8KrMIQgJpB9+Ke7+EBB2nEagpCEDkQj6KuGjhqbY+PGOvHADvQ3d3Mf/gmsMtRMkmyp+njvsYiGoczBO7c9wKaRTC6BhkBH/tZba77IGi1aMBumyub244mSMwSG/MCIo//kl9FmNq1cDl0Iyk6O3XUj8Jaheb0d66azD/cGm1VIbS4Fp2vIRzMRv3vgGSNmFCQj4epOYxC6F0M/o3JgINDR/Ge+8g1ox9CNGzNRmzQOjVuD7+WOc7w2uXyui0wyZ7YNLa79dPPfZOK+obu9EIQ0bMM0NLPTOCRCaSY2ldzSvasjXpbTpJoxEjZZTj25PpT+Qn+MTNfYYJ6dfKdVEu2iaTjSdDkGR+R9Lw0ya3mNy2FwOYVLKAYXXzPHHWjQZQh5BgwmSbWVJR8YGQdiPlRw8NiNT4CcAu4glRONazKwexORBLJhakms0w4MI/zRxzDdVETAGfzlYwFIJKCjc611iVPvB6lptBKbK5tAZ+BbqaNXQh6WwaO51NhDzzI4Eu3mYBkZq7O5VJyk0yKbaEhqUUQNRsCKhFAQG7deWlfkFob1hm8w1m4yJ601J74dlef0drBJrjmLkhng0W8cicYBW+YtzkUuS2AlvBDJhmkq3Uf4ITF/9FfZn0DVSXeOetkaHkt9SgcigCgwasaDLimJApff5YH1M/BNQiuhz7RW1rYedGqenTrVkHTkNa3xN0kyfhRo9+xKpjQe//B8pzudFhNYjAZnVduRpL0fZyoNqH6w1qbiZ254m6JZeRMbmFsbjCMKlUFmmXplE7Pp53XAciyUyOVwxfSLoXTAk/48rALdqqY2qTimEWBnn52SMeFNEz/IWuO1lVHGhtd34Pl5HoZWY64VnDyqsgY0u2AZQNafUMP+/l3GjsSc88xq/hQQSruy7sDgAt9J8DcEqa5JrC6OG3kw+joT+HRZZghABoHnNZLsksbOnJgkmB+oNN3MhADsgJUa1PggBTe2JgiR2AAhAeiSWYM1AXhtZG0YKtFik6Iz6Y3gfEgFndaFgAsndFrQhJNnDIiZAl4d51+d2SGqEREkC+29XGfE3FIlsT5cSZJJULl05DjEeCImEqcdGOYQDfcP+G2U7iICJh1ext5sw3mXcBvi5xUwXhgF2imHaS160XpGj5+EqSuWTIRNlpGjxzHr4tqHdUwkHXBEUsob1wprxhFD816Lx0IMpYZUZ6UPqBbNkGQGeMQ2IX5bpVBGg0iVF/f/yDN6Ww78x4RjUNu2j/4jTL/jJmhhcmcrdKz9MmicTLXS1Dv+gnl/l6S+8eFPc1bkwu6D0Ld1Dx8S2JfExi0HtjFrhuqGt56Eq3/N3A1/95ecZamUEQRt5z2PQWFwCOZ/7SFOC76L13V+53PgCKAGmjbeBTNwLQT+M3/2T9xPT/LBGT0TkplcbUiSJiYK/dBTMddKweKrn/o8AGqDC3sOpk6gA5iZKDGVXDQfhmCUTMnfwZE6nSlOwiTloJ7aD+I4BLyGdZ+Azi27XDuKqQVULVoT8fVU+nnuvCzfMDW+YBNyJ2Vazu8/jPncFs7dTsHrmLf3EXjn1vuh48H/gkUHtyPQ1kLvngNQ7h/CgPkcT7Xq3fksxwcjcTUophdnzNxmAnjuJJp8J+6dI1xauHrT3Zi7vR/moBbpxY0EMj8i3Zg1oCyEhls0zlYKTDCBheODRs6gwUT0iTa4B8dtwbwuZUnI7JKmpD6NK5wJvtTaBoPHT6TIoacxJUckAHeiptO4A6vn3hG9HjMTBG4KXn/ktWfwJkIzipmX80deg2bMzlA2pfGzd0HPzmegBTUdkQ4uoWbs2XfYxRgtgS459WZJ42UmHBTey8rEpU3s5JSU49TV33EzZwlUSkJxp7aaYShDGlhM6pTycoVPSO/Uf7R/0JM3SfOR5qIxGyQn3Lf/0DhyKI1ZVLo6zW8cQdUG2rQk1zEqmpEkQpeCSKUd2126bA7eWESfn7n+k/z97Q3/5kmwShqoPKFnQTJDEkh/dX/UvyGyAOVuY0yhFYPGHzr4RKpfH2qKMw8+kQDLOq1J2Q8NHoduuoKD/lwQQkHzutuhAzVVbZATJrJBqQLURJkKpRNzsz07k7I61F6z1n+KP89avYLfiZhw/sjrrE2JnUIcQaJn/enBx7n+3L5DMHS2y123nGZd9sRkInUWSubCKSqRpK70iTIScvpLgakkDp0ja7oWQ3yCDaBlHFEzAhvoSUidhq2EQAgE1277nOMDolaaJtSmodaTDAaAZB06t1LrCSijeCIOaUx1C1vghoAnSOs8geZZW9AN1YUAn4mgjIWh0rb9W+5ZEZMATg9UWZPMHC5CcbE7yV3iq04cfPJ/QqGNvIAaRP07St7XmODBaBtkJC43tbShcMdF8btI6zWuWsb1v9z9PIM2FiCo/HzDo0zRp85KHgiZxwTYDuw7f9PfMuuZgEpkVE370XgUvqFDCmlGou5fQs0eS6Da5W0j/z1rkhHqe8V3gQ7Fteah00+MY6IeXTz6xoT9fTYjCNYmYznRxwbHkT8NCDmATqrumY5Zf70SGlc64F1AMKqBjmy6XwLoJImmQhquB8HUKlT3plXLPZhpU3ImofGT0PVFYlr1hvOkBMieZELjGZP+aZe//gy/xw31zJ8jObvlG6x5wpaL8bRbGMyD5ltJa7Xd81VfP23pB+BD33tCzJVr04WhjBKkEaS51f79L8OCbZuYUUxCz1/kz3Q50ydAUPmTpzeL/zjx3DoyHYzadz0PC1DzLfrSvXD8ri94NyJOJdSSMgVcLCyYySwYrOqeqDwjPl7611XTSlrj/A+OQCeGG4YxnGFs2s+qX7o41W+04hkHRwhdlmoTPrdKoqBjzYPgoQfJ9ZmJLjzNaj0l+0lLqTRWjEtzV6bZHIDw4LHz23D1+tt5LTNQ61F2RVkxqvE4fBKY14RtM7njdwVjTkxUng0iqHGHhjEhgYYPOxvht2kw1WVcjYRCrH/iX01UHET6td4G9bkAunrgyEE6uKxk1KKY5VohaNZIYp/CIaO2LM/ZJqYznNsC+FNwZRqYqE91gU9YFDKpG8uxqdVfnewa75yp234snvFiZXlGNJ7e9S5K70xh5E2rPsGlYQYXJCafi55Fjf0GR/5lvKtnmEkcziJmV5L+enLMWeMdf+pg+bODJoFAgWWZvl7mfAhToRzLIDV34mUmN4p6rnxlAig9rDAl3kaeSKoAjir81ckmZGYnAh1JZjIXatJowRbBlKPNld9c/yGb0AQR8EpYVhJmiRXKlD63QH34yS2hKrE28Voz0aKg8wZ8PiPkzhrrABzbCp+MyxGMVlN9ztdjX9KahH0CadcgOTa5w4zWkAY0ARlU/bvJDDqSPlP7rcvVZeNwYfW5CYlfcc4zFuKm9WDzppZAKFTysjB7XdrMBAcJOYsaBV7iS4GfS8BhHGD0jMPaCJxKVA2l83M93hikZ8sG/L9+4gmlJs1oBlkPq1cbsKYDvl4Y7jEAmQgY503u+ctpO7ygkcwFkB2jN5LArk0ZKwDZIOu2WqP7musNt5uh55WG0FIqnH/9oJssrHivvcrWpMiZPJzR2F+4xihoUDG2frAQgC69DmYl24S8Oo5wOsmEQPezuPnpy9WbWpvPFPAUVGGQwVm7wD1XEISqYtyOJhXe17JJjZ9LPyVoDoBi2Rx6JHjwmaBLQiiFCiKn/3c4/EUZ3ye1EEgD28ukBJ3JnzO1X7+sphOJ41JftjSeHf/Z2MqKirapPuMHMBXdzLhxJho7BIe9YvvU+uwEbey4D3BF122S4a1sTHcB4hPDYI69FV314kVTm79ihxhG/uH0/3XnJvpfV77Zct+tUJWqvAeSqymepvesPyVXlQyJydkO0nb0uQq8qrwvQqC7r+N/fRYjs7SoqmRDoigqRrVjJ1TT+XKoSlV+z4KB85E6a/umxnCi/YZ5r1aCjuRXA+AKHLRt81IAAAAASUVORK5CYII=", alt: "Cash On Delivery", role: "presentation" }));
}
function CashOnDeliveryMethod({ setting }) {
    const { checkoutSuccessUrl, orderPlaced, orderId, checkoutData } = useCheckout();
    const { registerPaymentComponent } = useCheckoutDispatch();
    (0,react.useEffect)(() => {
        if (orderPlaced && checkoutData.paymentMethod === 'cod') {
            // Redirect to the checkout success page
            window.location.href = `${checkoutSuccessUrl}/${orderId}`;
        }
    }, [orderPlaced, checkoutSuccessUrl, orderId]);
    (0,react.useEffect)(() => {
        registerPaymentComponent('cod', {
            nameRenderer: () => (react.createElement("div", { className: "flex items-center justify-between w-full" },
                react.createElement("span", null, setting.codDisplayName),
                react.createElement(CODLogo, null))),
            formRenderer: () => (react.createElement("div", { className: "flex justify-center text-muted-foreground" },
                react.createElement("div", { className: "w-2/3 text-center py-3" }, _('Conveniently pay with cash at your doorstep when your order is delivered.')))),
            checkoutButtonRenderer: () => {
                const { checkout } = useCheckoutDispatch();
                const { loadingStates, orderPlaced } = useCheckout();
                const handleClick = async (e) => {
                    e.preventDefault();
                    try {
                        await checkout();
                    }
                    catch (error) {
                        react_toastify_esm/* toast */.oR.error(_('Failed to place order. Please try again.'));
                    }
                };
                const isDisabled = loadingStates.placingOrder || orderPlaced;
                return (react.createElement(Button_Button, { variant: 'default', size: 'xl', type: "button", onClick: handleClick, disabled: isDisabled, className: "w-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-primary" },
                    react.createElement("span", { className: "flex items-center justify-center space-x-2" }, loadingStates.placingOrder ? (react.createElement(react.Fragment, null,
                        react.createElement("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" },
                            react.createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                            react.createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })),
                        react.createElement("span", null, _('Placing Order...')))) : orderPlaced ? (react.createElement(react.Fragment, null,
                        react.createElement("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24" },
                            react.createElement("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" })),
                        react.createElement("span", null, _('Order Placed')))) : (react.createElement(react.Fragment, null,
                        react.createElement("span", null, _('Place Order')),
                        react.createElement("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24" },
                            react.createElement("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" })))))));
            }
        });
    }, [registerPaymentComponent, setting.codDisplayName]);
    return null;
}
const CashOnDelivery_layout = {
    areaId: 'checkoutForm',
    sortOrder: 10
};
const CashOnDelivery_query = (/* unused pure expression or super */ null && (`
  query Query {
    setting {
      codDisplayName
    }
  }
`));
//# sourceMappingURL=CashOnDelivery.js.map
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
;// ./node_modules/@evershop/evershop/dist/modules/paypal/pages/frontStore/checkout/Paypal.js





function PaypalLogo({ width = 70, height = 30 }) {
    return (react.createElement("img", { width: width, height: height, src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxcHgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMDEgMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHhtbG5zPSJodHRwOiYjeDJGOyYjeDJGO3d3dy53My5vcmcmI3gyRjsyMDAwJiN4MkY7c3ZnIj48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDEyLjIzNyAyLjggTCA0LjQzNyAyLjggQyAzLjkzNyAyLjggMy40MzcgMy4yIDMuMzM3IDMuNyBMIDAuMjM3IDIzLjcgQyAwLjEzNyAyNC4xIDAuNDM3IDI0LjQgMC44MzcgMjQuNCBMIDQuNTM3IDI0LjQgQyA1LjAzNyAyNC40IDUuNTM3IDI0IDUuNjM3IDIzLjUgTCA2LjQzNyAxOC4xIEMgNi41MzcgMTcuNiA2LjkzNyAxNy4yIDcuNTM3IDE3LjIgTCAxMC4wMzcgMTcuMiBDIDE1LjEzNyAxNy4yIDE4LjEzNyAxNC43IDE4LjkzNyA5LjggQyAxOS4yMzcgNy43IDE4LjkzNyA2IDE3LjkzNyA0LjggQyAxNi44MzcgMy41IDE0LjgzNyAyLjggMTIuMjM3IDIuOCBaIE0gMTMuMTM3IDEwLjEgQyAxMi43MzcgMTIuOSAxMC41MzcgMTIuOSA4LjUzNyAxMi45IEwgNy4zMzcgMTIuOSBMIDguMTM3IDcuNyBDIDguMTM3IDcuNCA4LjQzNyA3LjIgOC43MzcgNy4yIEwgOS4yMzcgNy4yIEMgMTAuNjM3IDcuMiAxMS45MzcgNy4yIDEyLjYzNyA4IEMgMTMuMTM3IDguNCAxMy4zMzcgOS4xIDEzLjEzNyAxMC4xIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDM1LjQzNyAxMCBMIDMxLjczNyAxMCBDIDMxLjQzNyAxMCAzMS4xMzcgMTAuMiAzMS4xMzcgMTAuNSBMIDMwLjkzNyAxMS41IEwgMzAuNjM3IDExLjEgQyAyOS44MzcgOS45IDI4LjAzNyA5LjUgMjYuMjM3IDkuNSBDIDIyLjEzNyA5LjUgMTguNjM3IDEyLjYgMTcuOTM3IDE3IEMgMTcuNTM3IDE5LjIgMTguMDM3IDIxLjMgMTkuMzM3IDIyLjcgQyAyMC40MzcgMjQgMjIuMTM3IDI0LjYgMjQuMDM3IDI0LjYgQyAyNy4zMzcgMjQuNiAyOS4yMzcgMjIuNSAyOS4yMzcgMjIuNSBMIDI5LjAzNyAyMy41IEMgMjguOTM3IDIzLjkgMjkuMjM3IDI0LjMgMjkuNjM3IDI0LjMgTCAzMy4wMzcgMjQuMyBDIDMzLjUzNyAyNC4zIDM0LjAzNyAyMy45IDM0LjEzNyAyMy40IEwgMzYuMTM3IDEwLjYgQyAzNi4yMzcgMTAuNCAzNS44MzcgMTAgMzUuNDM3IDEwIFogTSAzMC4zMzcgMTcuMiBDIDI5LjkzNyAxOS4zIDI4LjMzNyAyMC44IDI2LjEzNyAyMC44IEMgMjUuMDM3IDIwLjggMjQuMjM3IDIwLjUgMjMuNjM3IDE5LjggQyAyMy4wMzcgMTkuMSAyMi44MzcgMTguMiAyMy4wMzcgMTcuMiBDIDIzLjMzNyAxNS4xIDI1LjEzNyAxMy42IDI3LjIzNyAxMy42IEMgMjguMzM3IDEzLjYgMjkuMTM3IDE0IDI5LjczNyAxNC42IEMgMzAuMjM3IDE1LjMgMzAuNDM3IDE2LjIgMzAuMzM3IDE3LjIgWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMwMDMwODciIGQ9Ik0gNTUuMzM3IDEwIEwgNTEuNjM3IDEwIEMgNTEuMjM3IDEwIDUwLjkzNyAxMC4yIDUwLjczNyAxMC41IEwgNDUuNTM3IDE4LjEgTCA0My4zMzcgMTAuOCBDIDQzLjIzNyAxMC4zIDQyLjczNyAxMCA0Mi4zMzcgMTAgTCAzOC42MzcgMTAgQyAzOC4yMzcgMTAgMzcuODM3IDEwLjQgMzguMDM3IDEwLjkgTCA0Mi4xMzcgMjMgTCAzOC4yMzcgMjguNCBDIDM3LjkzNyAyOC44IDM4LjIzNyAyOS40IDM4LjczNyAyOS40IEwgNDIuNDM3IDI5LjQgQyA0Mi44MzcgMjkuNCA0My4xMzcgMjkuMiA0My4zMzcgMjguOSBMIDU1LjgzNyAxMC45IEMgNTYuMTM3IDEwLjYgNTUuODM3IDEwIDU1LjMzNyAxMCBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA2Ny43MzcgMi44IEwgNTkuOTM3IDIuOCBDIDU5LjQzNyAyLjggNTguOTM3IDMuMiA1OC44MzcgMy43IEwgNTUuNzM3IDIzLjYgQyA1NS42MzcgMjQgNTUuOTM3IDI0LjMgNTYuMzM3IDI0LjMgTCA2MC4zMzcgMjQuMyBDIDYwLjczNyAyNC4zIDYxLjAzNyAyNCA2MS4wMzcgMjMuNyBMIDYxLjkzNyAxOCBDIDYyLjAzNyAxNy41IDYyLjQzNyAxNy4xIDYzLjAzNyAxNy4xIEwgNjUuNTM3IDE3LjEgQyA3MC42MzcgMTcuMSA3My42MzcgMTQuNiA3NC40MzcgOS43IEMgNzQuNzM3IDcuNiA3NC40MzcgNS45IDczLjQzNyA0LjcgQyA3Mi4yMzcgMy41IDcwLjMzNyAyLjggNjcuNzM3IDIuOCBaIE0gNjguNjM3IDEwLjEgQyA2OC4yMzcgMTIuOSA2Ni4wMzcgMTIuOSA2NC4wMzcgMTIuOSBMIDYyLjgzNyAxMi45IEwgNjMuNjM3IDcuNyBDIDYzLjYzNyA3LjQgNjMuOTM3IDcuMiA2NC4yMzcgNy4yIEwgNjQuNzM3IDcuMiBDIDY2LjEzNyA3LjIgNjcuNDM3IDcuMiA2OC4xMzcgOCBDIDY4LjYzNyA4LjQgNjguNzM3IDkuMSA2OC42MzcgMTAuMSBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5MC45MzcgMTAgTCA4Ny4yMzcgMTAgQyA4Ni45MzcgMTAgODYuNjM3IDEwLjIgODYuNjM3IDEwLjUgTCA4Ni40MzcgMTEuNSBMIDg2LjEzNyAxMS4xIEMgODUuMzM3IDkuOSA4My41MzcgOS41IDgxLjczNyA5LjUgQyA3Ny42MzcgOS41IDc0LjEzNyAxMi42IDczLjQzNyAxNyBDIDczLjAzNyAxOS4yIDczLjUzNyAyMS4zIDc0LjgzNyAyMi43IEMgNzUuOTM3IDI0IDc3LjYzNyAyNC42IDc5LjUzNyAyNC42IEMgODIuODM3IDI0LjYgODQuNzM3IDIyLjUgODQuNzM3IDIyLjUgTCA4NC41MzcgMjMuNSBDIDg0LjQzNyAyMy45IDg0LjczNyAyNC4zIDg1LjEzNyAyNC4zIEwgODguNTM3IDI0LjMgQyA4OS4wMzcgMjQuMyA4OS41MzcgMjMuOSA4OS42MzcgMjMuNCBMIDkxLjYzNyAxMC42IEMgOTEuNjM3IDEwLjQgOTEuMzM3IDEwIDkwLjkzNyAxMCBaIE0gODUuNzM3IDE3LjIgQyA4NS4zMzcgMTkuMyA4My43MzcgMjAuOCA4MS41MzcgMjAuOCBDIDgwLjQzNyAyMC44IDc5LjYzNyAyMC41IDc5LjAzNyAxOS44IEMgNzguNDM3IDE5LjEgNzguMjM3IDE4LjIgNzguNDM3IDE3LjIgQyA3OC43MzcgMTUuMSA4MC41MzcgMTMuNiA4Mi42MzcgMTMuNiBDIDgzLjczNyAxMy42IDg0LjUzNyAxNCA4NS4xMzcgMTQuNiBDIDg1LjczNyAxNS4zIDg1LjkzNyAxNi4yIDg1LjczNyAxNy4yIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDA5Y2RlIiBkPSJNIDk1LjMzNyAzLjMgTCA5Mi4xMzcgMjMuNiBDIDkyLjAzNyAyNCA5Mi4zMzcgMjQuMyA5Mi43MzcgMjQuMyBMIDk1LjkzNyAyNC4zIEMgOTYuNDM3IDI0LjMgOTYuOTM3IDIzLjkgOTcuMDM3IDIzLjQgTCAxMDAuMjM3IDMuNSBDIDEwMC4zMzcgMy4xIDEwMC4wMzcgMi44IDk5LjYzNyAyLjggTCA5Ni4wMzcgMi44IEMgOTUuNjM3IDIuOCA5NS40MzcgMyA5NS4zMzcgMy4zIFoiPjwvcGF0aD48L3N2Zz4", alt: "Paypal", role: "presentation" }));
}
function PaypalMethod({ createOrderAPI, setting: { paypalDisplayName } }) {
    const { checkoutSuccessUrl, orderPlaced, orderId, checkoutData: { paymentMethod } } = useCheckout();
    const { registerPaymentComponent } = useCheckoutDispatch();
    (0,react.useEffect)(() => {
        const createOrder = async () => {
            const response = await fetch(createOrderAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_id: orderId
                })
            });
            const data = (await response.json());
            if (!data.error) {
                const { approveUrl } = data.data;
                // Redirect to PayPal for payment approval
                window.location.href = approveUrl;
            }
            else {
                react_toastify_esm/* toast */.oR.error(data.error.message);
                // Wait for 2 seconds and reload the checkout page
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        };
        if (orderPlaced && orderId && paymentMethod === 'paypal') {
            // Call the API to create the order
            createOrder();
        }
    }, [orderPlaced, checkoutSuccessUrl, orderId]);
    (0,react.useEffect)(() => {
        registerPaymentComponent('paypal', {
            nameRenderer: () => (react.createElement("div", { className: "flex items-center justify-between w-full" },
                react.createElement("span", null, paypalDisplayName),
                react.createElement(PaypalLogo, null))),
            formRenderer: () => (react.createElement("div", { className: "flex justify-center text-muted-foreground" },
                react.createElement("div", { className: "w-2/3 text-center py-3" }, _('You will be redirected to PayPal for payment processing.')))),
            checkoutButtonRenderer: () => {
                const { checkout } = useCheckoutDispatch();
                const { loadingStates, orderPlaced } = useCheckout();
                const handleClick = async (e) => {
                    e.preventDefault();
                    await checkout();
                };
                const isDisabled = loadingStates.placingOrder || orderPlaced;
                return (react.createElement(Button_Button, { variant: 'default', size: 'xl', type: "button", onClick: handleClick, disabled: isDisabled, className: "w-full text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed", style: {
                        backgroundColor: isDisabled ? '#0070ba80' : '#0070ba'
                    }, onMouseEnter: (e) => {
                        if (!isDisabled) {
                            e.currentTarget.style.backgroundColor = '#005ea6';
                        }
                    }, onMouseLeave: (e) => {
                        if (!isDisabled) {
                            e.currentTarget.style.backgroundColor = '#0070ba';
                        }
                    } },
                    react.createElement("span", { className: "flex items-center justify-center space-x-2" }, loadingStates.placingOrder ? (react.createElement(react.Fragment, null,
                        react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px", width: "24", height: "24", viewBox: "0 0 48 48" },
                            react.createElement("path", { fill: "#1565C0", d: "M18.7,13.767l0.005,0.002C18.809,13.326,19.187,13,19.66,13h13.472c0.017,0,0.034-0.007,0.051-0.006C32.896,8.215,28.887,6,25.35,6H11.878c-0.474,0-0.852,0.335-0.955,0.777l-0.005-0.002L5.029,33.813l0.013,0.001c-0.014,0.064-0.039,0.125-0.039,0.194c0,0.553,0.447,0.991,1,0.991h8.071L18.7,13.767z" }),
                            react.createElement("path", { fill: "#039BE5", d: "M33.183,12.994c0.053,0.876-0.005,1.829-0.229,2.882c-1.281,5.995-5.912,9.115-11.635,9.115c0,0-3.47,0-4.313,0c-0.521,0-0.767,0.306-0.88,0.54l-1.74,8.049l-0.305,1.429h-0.006l-1.263,5.796l0.013,0.001c-0.014,0.064-0.039,0.125-0.039,0.194c0,0.553,0.447,1,1,1h7.333l0.013-0.01c0.472-0.007,0.847-0.344,0.945-0.788l0.018-0.015l1.812-8.416c0,0,0.126-0.803,0.97-0.803s4.178,0,4.178,0c5.723,0,10.401-3.106,11.683-9.102C42.18,16.106,37.358,13.019,33.183,12.994z" }),
                            react.createElement("path", { fill: "#283593", d: "M19.66,13c-0.474,0-0.852,0.326-0.955,0.769L18.7,13.767l-2.575,11.765c0.113-0.234,0.359-0.54,0.88-0.54c0.844,0,4.235,0,4.235,0c5.723,0,10.432-3.12,11.713-9.115c0.225-1.053,0.282-2.006,0.229-2.882C33.166,12.993,33.148,13,33.132,13H19.66z" })),
                        react.createElement("span", null, _('Redirecting to PayPal...')))) : orderPlaced ? (react.createElement(react.Fragment, null,
                        react.createElement("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24" },
                            react.createElement("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" })),
                        react.createElement("span", null, _('Redirecting to PayPal...')))) : (react.createElement(react.Fragment, null,
                        react.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px", width: "24", height: "24", viewBox: "0 0 48 48" },
                            react.createElement("path", { fill: "#1565C0", d: "M18.7,13.767l0.005,0.002C18.809,13.326,19.187,13,19.66,13h13.472c0.017,0,0.034-0.007,0.051-0.006C32.896,8.215,28.887,6,25.35,6H11.878c-0.474,0-0.852,0.335-0.955,0.777l-0.005-0.002L5.029,33.813l0.013,0.001c-0.014,0.064-0.039,0.125-0.039,0.194c0,0.553,0.447,0.991,1,0.991h8.071L18.7,13.767z" }),
                            react.createElement("path", { fill: "#039BE5", d: "M33.183,12.994c0.053,0.876-0.005,1.829-0.229,2.882c-1.281,5.995-5.912,9.115-11.635,9.115c0,0-3.47,0-4.313,0c-0.521,0-0.767,0.306-0.88,0.54l-1.74,8.049l-0.305,1.429h-0.006l-1.263,5.796l0.013,0.001c-0.014,0.064-0.039,0.125-0.039,0.194c0,0.553,0.447,1,1,1h7.333l0.013-0.01c0.472-0.007,0.847-0.344,0.945-0.788l0.018-0.015l1.812-8.416c0,0,0.126-0.803,0.97-0.803s4.178,0,4.178,0c5.723,0,10.401-3.106,11.683-9.102C42.18,16.106,37.358,13.019,33.183,12.994z" }),
                            react.createElement("path", { fill: "#283593", d: "M19.66,13c-0.474,0-0.852,0.326-0.955,0.769L18.7,13.767l-2.575,11.765c0.113-0.234,0.359-0.54,0.88-0.54c0.844,0,4.235,0,4.235,0c5.723,0,10.432-3.12,11.713-9.115c0.225-1.053,0.282-2.006,0.229-2.882C33.166,12.993,33.148,13,33.132,13H19.66z" })),
                        react.createElement("span", null, _('Pay with PayPal')))))));
            }
        });
    }, [registerPaymentComponent, paypalDisplayName]);
    return null;
}
const Paypal_layout = {
    areaId: 'checkoutForm',
    sortOrder: 10
};
const Paypal_query = (/* unused pure expression or super */ null && (`
  query Query {
    setting {
      paypalDisplayName
    }
    createOrderAPI: url(routeId: "paypalCreateOrder")
  }
`));
//# sourceMappingURL=Paypal.js.map
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
;// ./node_modules/@evershop/evershop/dist/components/common/RenderIfTrue.js
function RenderIfTrue({ condition, children }) {
    return condition === true ? children : null;
}
//# sourceMappingURL=RenderIfTrue.js.map
// EXTERNAL MODULE: ./node_modules/@stripe/react-stripe-js/dist/react-stripe.umd.js
var react_stripe_umd = __webpack_require__(22926);
// EXTERNAL MODULE: ./node_modules/@stripe/stripe-js/dist/stripe.esm.js
var stripe_esm = __webpack_require__(37427);
// EXTERNAL MODULE: ./node_modules/zero-decimal-currencies/dist/index.js + 1 modules
var zero_decimal_currencies_dist = __webpack_require__(74754);
;// ./node_modules/@evershop/evershop/dist/modules/stripe/pages/frontStore/checkout/Stripe.js












const TestCards = ({ showTestCard, testSuccess, testFailure }) => {
    return (react.createElement("div", null,
        react.createElement("div", { style: {
                border: '1px solid #dddddd',
                borderRadius: '3px',
                padding: '5px',
                boxSizing: 'border-box',
                marginBottom: '10px'
            } },
            showTestCard === 'success' && (react.createElement("div", null,
                react.createElement("div", null,
                    react.createElement("b", null, "Test success:")),
                react.createElement("div", { className: "text-xs text-gray-600" }, "Test card number: 4242 4242 4242 4242"),
                react.createElement("div", { className: "text-xs text-gray-600" }, "Test card expiry: 04/26"),
                react.createElement("div", { className: "text-xs text-gray-600" }, "Test card CVC: 242"))),
            showTestCard === 'failure' && (react.createElement("div", null,
                react.createElement("div", null,
                    react.createElement("b", null, "Test failure:")),
                react.createElement("div", { className: "text-xs text-gray-600" }, "Test card number: 4000 0000 0000 9995"),
                react.createElement("div", { className: "text-xs text-gray-600" }, "Test card expiry: 04/26"),
                react.createElement("div", { className: "text-xs text-gray-600" }, "Test card CVC: 242")))),
        react.createElement("div", { className: "stripe-form-heading flex justify-between" },
            react.createElement("div", { className: "self-center" },
                react.createElement("svg", { id: "Layer_1", "data-name": "Layer 1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 150 34" },
                    react.createElement("defs", null),
                    react.createElement("title", null, "Powered by Stripe"),
                    react.createElement("path", { d: "M146,0H3.73A3.73,3.73,0,0,0,0,3.73V30.27A3.73,3.73,0,0,0,3.73,34H146a4,4,0,0,0,4-4V4A4,4,0,0,0,146,0Zm3,30a3,3,0,0,1-3,3H3.73A2.74,2.74,0,0,1,1,30.27V3.73A2.74,2.74,0,0,1,3.73,1H146a3,3,0,0,1,3,3Z" }),
                    react.createElement("path", { d: "M17.07,11.24h-4.3V22h1.92V17.84h2.38c2.4,0,3.9-1.16,3.9-3.3S19.47,11.24,17.07,11.24Zm-.1,5H14.69v-3.3H17c1.38,0,2.11.59,2.11,1.65S18.35,16.19,17,16.19Z" }),
                    react.createElement("path", { d: "M25.1,14a3.77,3.77,0,0,0-3.8,4.09,3.81,3.81,0,1,0,7.59,0A3.76,3.76,0,0,0,25.1,14Zm0,6.67c-1.22,0-2-1-2-2.58s.76-2.58,2-2.58,2,1,2,2.58S26.31,20.66,25.1,20.66Z" }),
                    react.createElement("polygon", { points: "36.78 19.35 35.37 14.13 33.89 14.13 32.49 19.35 31.07 14.13 29.22 14.13 31.59 22.01 33.15 22.01 34.59 16.85 36.03 22.01 37.59 22.01 39.96 14.13 38.18 14.13 36.78 19.35" }),
                    react.createElement("path", { d: "M44,14a3.83,3.83,0,0,0-3.75,4.09,3.79,3.79,0,0,0,3.83,4.09A3.47,3.47,0,0,0,47.49,20L46,19.38a1.78,1.78,0,0,1-1.83,1.26A2.12,2.12,0,0,1,42,18.47h5.52v-.6C47.54,15.71,46.32,14,44,14Zm-1.93,3.13A1.92,1.92,0,0,1,44,15.5a1.56,1.56,0,0,1,1.69,1.62Z" }),
                    react.createElement("path", { d: "M50.69,15.3V14.13h-1.8V22h1.8V17.87a1.89,1.89,0,0,1,2-2,4.68,4.68,0,0,1,.66,0v-1.8c-.14,0-.3,0-.51,0A2.29,2.29,0,0,0,50.69,15.3Z" }),
                    react.createElement("path", { d: "M57.48,14a3.83,3.83,0,0,0-3.75,4.09,3.79,3.79,0,0,0,3.83,4.09A3.47,3.47,0,0,0,60.93,20l-1.54-.59a1.78,1.78,0,0,1-1.83,1.26,2.12,2.12,0,0,1-2.1-2.17H61v-.6C61,15.71,59.76,14,57.48,14Zm-1.93,3.13a1.92,1.92,0,0,1,1.92-1.62,1.56,1.56,0,0,1,1.69,1.62Z" }),
                    react.createElement("path", { d: "M67.56,15a2.85,2.85,0,0,0-2.26-1c-2.21,0-3.47,1.85-3.47,4.09s1.26,4.09,3.47,4.09a2.82,2.82,0,0,0,2.26-1V22h1.8V11.24h-1.8Zm0,3.35a2,2,0,0,1-2,2.28c-1.31,0-2-1-2-2.52s.7-2.52,2-2.52c1.11,0,2,.81,2,2.29Z" }),
                    react.createElement("path", { d: "M79.31,14A2.88,2.88,0,0,0,77,15V11.24h-1.8V22H77v-.83a2.86,2.86,0,0,0,2.27,1c2.2,0,3.46-1.86,3.46-4.09S81.51,14,79.31,14ZM79,20.6a2,2,0,0,1-2-2.28v-.47c0-1.48.84-2.29,2-2.29,1.3,0,2,1,2,2.52S80.25,20.6,79,20.6Z" }),
                    react.createElement("path", { d: "M86.93,19.66,85,14.13H83.1L86,21.72l-.3.74a1,1,0,0,1-1.14.79,4.12,4.12,0,0,1-.6,0v1.51a4.62,4.62,0,0,0,.73.05,2.67,2.67,0,0,0,2.78-2l3.24-8.62H88.82Z" }),
                    react.createElement("path", { d: "M125,12.43a3,3,0,0,0-2.13.87l-.14-.69h-2.39V25.53l2.72-.59V21.81a3,3,0,0,0,1.93.7c1.94,0,3.72-1.59,3.72-5.11C128.71,14.18,126.91,12.43,125,12.43Zm-.65,7.63a1.61,1.61,0,0,1-1.28-.52l0-4.11a1.64,1.64,0,0,1,1.3-.55c1,0,1.68,1.13,1.68,2.58S125.36,20.06,124.35,20.06Z" }),
                    react.createElement("path", { d: "M133.73,12.43c-2.62,0-4.21,2.26-4.21,5.11,0,3.37,1.88,5.08,4.56,5.08a6.12,6.12,0,0,0,3-.73V19.64a5.79,5.79,0,0,1-2.7.62c-1.08,0-2-.39-2.14-1.7h5.38c0-.15,0-.74,0-1C137.71,14.69,136.35,12.43,133.73,12.43Zm-1.47,4.07c0-1.26.77-1.79,1.45-1.79s1.4.53,1.4,1.79Z" }),
                    react.createElement("path", { d: "M113,13.36l-.17-.82h-2.32v9.71h2.68V15.67a1.87,1.87,0,0,1,2.05-.58V12.54A1.8,1.8,0,0,0,113,13.36Z" }),
                    react.createElement("path", { d: "M99.46,15.46c0-.44.36-.61.93-.61a5.9,5.9,0,0,1,2.7.72V12.94a7,7,0,0,0-2.7-.51c-2.21,0-3.68,1.18-3.68,3.16,0,3.1,4.14,2.6,4.14,3.93,0,.52-.44.69-1,.69a6.78,6.78,0,0,1-3-.9V22a7.38,7.38,0,0,0,3,.64c2.26,0,3.82-1.15,3.82-3.16C103.62,16.12,99.46,16.72,99.46,15.46Z" }),
                    react.createElement("path", { d: "M107.28,10.24l-2.65.58v8.93a2.77,2.77,0,0,0,2.82,2.87,4.16,4.16,0,0,0,1.91-.37V20c-.35.15-2.06.66-2.06-1V15h2.06V12.66h-2.06Z" }),
                    react.createElement("polygon", { points: "116.25 11.7 118.98 11.13 118.98 8.97 116.25 9.54 116.25 11.7" }),
                    react.createElement("rect", { x: "116.25", y: "12.61", width: "2.73", height: "9.64" }))),
            react.createElement("div", { className: "self-center flex space-x-2 pb-2" },
                react.createElement(Button_Button, { onClick: testSuccess, title: "Test success", variant: "default" }, "Test success"),
                react.createElement(Button_Button, { onClick: testFailure, title: "Test failure", variant: "destructive" }, "Test failure")))));
};
function CheckoutForm({ stripePublishableKey, createPaymentIntentApi, returnUrl }) {
    const [clientSecret, setClientSecret] = react.useState('');
    const [showTestCard, setShowTestCard] = (0,react.useState)('success');
    const stripe = (0,react_stripe_umd.useStripe)();
    const elements = (0,react_stripe_umd.useElements)();
    const { cartId, orderId, orderPlaced, checkoutData: { paymentMethod } } = useCheckout();
    const { data: { billingAddress, shippingAddress, customerFullName, customerEmail } } = useCartState();
    (0,react.useEffect)(() => {
        const validateStripe = async () => {
            if (!stripe || !elements) {
                react_toastify_esm/* toast */.oR.error(_('Stripe is not loaded. Please try again.'));
                return false;
            }
            const submit = await elements.submit();
            if (submit === null || submit === void 0 ? void 0 : submit.error) {
                react_toastify_esm/* toast */.oR.error(submit.error.message ||
                    _('Can not process payment. Please try again later.'));
                return false;
            }
            return true;
        };
        // Make validation function available globally
        if (typeof window !== 'undefined') {
            window.validateStripePayment = validateStripe;
        }
        return () => {
            if (typeof window !== 'undefined') {
                delete window.validateStripePayment;
            }
        };
    }, [stripe, elements]);
    (0,react.useEffect)(() => {
        if (orderId && orderPlaced && paymentMethod === 'stripe') {
            window
                .fetch(createPaymentIntentApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cart_id: cartId, order_id: orderId })
            })
                .then((res) => res.json())
                .then((data) => {
                if (data.error) {
                    react_toastify_esm/* toast */.oR.error(_('Some error occurred. Please try again later.'));
                }
                else {
                    setClientSecret(data.data.clientSecret);
                }
            });
        }
    }, [orderId, orderPlaced]);
    (0,react.useEffect)(() => {
        const confirmPayment = async () => {
            var _a, _b, _c, _d;
            const payload = await (stripe === null || stripe === void 0 ? void 0 : stripe.confirmPayment({
                clientSecret: clientSecret,
                elements: elements,
                confirmParams: {
                    payment_method_data: {
                        billing_details: {
                            name: (billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.fullName) ||
                                (shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.fullName) ||
                                customerFullName ||
                                '',
                            email: customerEmail,
                            phone: (billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.telephone) || (shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.telephone) || '',
                            address: {
                                line1: (billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.address1) || (shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.address1) || '',
                                country: ((_a = billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.country) === null || _a === void 0 ? void 0 : _a.code) ||
                                    ((_b = shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.country) === null || _b === void 0 ? void 0 : _b.code) ||
                                    '',
                                state: ((_c = billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.province) === null || _c === void 0 ? void 0 : _c.code) ||
                                    ((_d = shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.province) === null || _d === void 0 ? void 0 : _d.code) ||
                                    '',
                                postal_code: (billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.postcode) || (shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.postcode) || '',
                                city: (billingAddress === null || billingAddress === void 0 ? void 0 : billingAddress.city) || (shippingAddress === null || shippingAddress === void 0 ? void 0 : shippingAddress.city) || ''
                            }
                        }
                    },
                    return_url: `${returnUrl}?order_id=${orderId}`
                }
            }));
            if (payload === null || payload === void 0 ? void 0 : payload.error) {
                // Get the payment intent ID
                const paymentIntent = payload.error.payment_intent;
                // Redirect to the return URL with the payment intent ID
                window.location.href = `${returnUrl}?order_id=${orderId}&payment_intent=${paymentIntent === null || paymentIntent === void 0 ? void 0 : paymentIntent.id}`;
            }
        };
        if (orderPlaced && clientSecret) {
            confirmPayment();
        }
    }, [orderPlaced, clientSecret]);
    const testSuccess = () => {
        setShowTestCard('success');
    };
    const testFailure = () => {
        setShowTestCard('failure');
    };
    return (react.createElement(react.Fragment, null,
        react.createElement(RenderIfTrue, { condition: !!(stripe && elements) },
            react.createElement("div", null,
                react.createElement("div", { className: "stripe-form float-left w-full" },
                    stripePublishableKey &&
                        stripePublishableKey.startsWith('pk_test') && (react.createElement(TestCards, { showTestCard: showTestCard, testSuccess: testSuccess, testFailure: testFailure })),
                    react.createElement(react_stripe_umd.PaymentElement, { id: "payment-element" })))),
        react.createElement(RenderIfTrue, { condition: !!(!stripe || !elements) },
            react.createElement("div", { className: "flex justify-center p-3" },
                react.createElement(admin_Spinner, { width: 20, height: 20 })))));
}
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
let stripe;
const stripeLoader = (publishKey) => {
    if (!stripe) {
        stripe = (0,stripe_esm/* loadStripe */.c)(publishKey);
    }
    return stripe;
};
function Cards({ width = 24, height = 24 }) {
    return (react.createElement("img", { width: width, height: height, src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAmCAYAAAAMe5M4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAd2SURBVHgB7ZxtaBRHGMefe01y5s3UqiUmlaqlNgm1JU2ICdSqIEk/qIEE/dBGsNBKG7GhSi2FplCKtRAa0mItLTb1g/YC0S+NBNparGeI2GIxIQULamJpFJEkJppcsrfOfzdzt3vZ83YuZ+64ux+Me7s7O5eb5z/PPPPiWihABktpLFkpsZBYmmRpisRIivqwz17MxufOzs6C8vLyKkogPIz6+vpB9tHB0rjJx5KqPqDyvDt37nwuJyj4bfiNLKWbqKOkqg8b+yfT7XavLC0tPU4JisvlqpQk6ei5c+dmSHV/jyKp6gP9m62SQQnOnj17ashcf55U9ZFoAU4KQVICSHIeqwB814fINzJmOr/sHSP53hClWDjsFEWmf++hqfYO8rIjjM+x5GaTfV0Rpe2qI8crFWRbWaBch8F9V90kDXaTfLdfOfc/k1dEVpZsq+vI+lQFpXg8REUAMPz9T1qUoxEy8wK4h2Rlxs/Yt5ucm4lmLrfojK57hglCQvrXTZbMAnJWq8cU0WXeAnjQ+h1N7Gs2nV++PUS2s/uI/peJVuWyv8AS/pnxIZrqqGBepInsLzZRiugxLwGg1d9vbjGd3+Iiyto6Qk7nBNEwC0DGp8n7wpMkmxABgMcAKRFEj4gFMHW6W8j4wFVxTzX+LBYmANuNMZpZlWO6DIgAMYF1eWzighOdVwyvV5YXUmH+3N/huThIgzdHlc+FK3KosqyQun65SqNjk4bPeXpZ/v/U/DnZ6ZSTlcaOaVS8dtncsjV5edmiRCyAifeaRbKTc900ZayY29/bb46T74l08uWmkVmm/2gi59ZusjizaaGBUS4wo55hRuSVz/nrt7epIEgEjR900dBsvrZDNcpx78GfmQDUtanTx3cqAkBZe1leCMaIs6d36UQAETW80+k/r9m8JiIBRDQMnPzBrYvyzZDxzGjIe/Yb90gExAQSGz3EAlT0px9uoj+Zsdu/rtW1XhhFC1rokEYkMFDfwG2/8UHxc0sV4297/URI4xt5gDPB3xXi2XBE5AEmW78Xym9bKpEjK/RqrHVkSkkiXsDHho5U9CbFEogBBv7os1+V876BW7r7J0/1+T/v2F6seIcrAwHDFa9dqngUGFMrFHiFEiYMcOWf27p7AII5eUrfFUFUyFeQb747BcIeAEO6mcv9Qs84ljwIm8cyMUMi+IZ7Qg4hFxKIgOO5GPCKwUY60Fg1myfQUos1RuagtcOI2UwYSPAaO7aX6L7zizaPPy/EwjnfK+4FhAUganzgWBZ+L4Z13EuiyMM9FGtgLBgCoAXy4O6CxhiVZQX+ltk/EDA2AkD1fqDvRkveuO0YnQwRbAIuoupNar/Pv79fIySzCAtAui4+VWt1ymHzWCYlEkWeGqV4AIbg9M0a4fBXHv+1HbUlmvuBboJ7AHgRbSuHCBoPdtFLG7+ZE2hCGLxLeKuhVDlycfUNLIAAUsxlvaYFwwhdmj4dQSI3rjYADA7sMELY31ipCypRBrwB9yrg6I+X/OXy57mQtOIyi7AArIvFggwgTYSPNWW7uBYtWfExNVxVrhXALfpJ0/fzVsrvcbjRtBx4t0rp07VxBQTDg0mMKngrR6vHuUfpaiz+vMGBaDiERwFYzBFl5i77mlWPziMyAuBgwSgegDGQhpTAr093rzpEkGg0scPLwvBy9ctf+r0F9wDashEHeN6YG/ThO0KVbYSwALCy59hQEXLhxwhpLLxxfTliAsBKYSwmgkIBQ3/bfkl3jQ/9OFoXvb5M9V7o02E0PF+Yr/4eGFo7V4Bg0WjoZ8Rj9wDAuW2LkACmbzpoejiNHMuNRwO+TCfJmWJ/iq1oN8UTRi5dG/yp7jkQpJXMtlIYH4YNZVx0IYj0D7ed919D//9+Y2DXGjwPHxpqvYwZIgoC0xvqlWVdEe7/nRXynpS/iETAsrBtdT3FEzWbn9WdY5KnskwfG2jvBTyD7B/GacE1zDgiAa37R7C4kwWWPCF2MBqKmiEiD4BuIOtYC42+Wmf6GXiAyRuLKP3pCd11KT+TpOUuEsFe3kzxBgyAtQCA1h5sVCzWoG/HdW2k33botbBlo7z9mhZvNOePsoOHjGaIeDEIcYDr4yZlSdgsExeyyZ7lJXvetHIuZzpoZqVYP46lYFvhFopHeKsuyDe+JzpNy4FodgbNBgYDUUSylXle8wCu5iZFBGaRvVYa7V5C3hEXSctcQnsBAFo+NoWkiB7zngiCCBZf6zEfE7hySdrQSnJDK1GuueVLrP07qzvI/nxsF38SkajsCcQmz7xr6p6/yfYOkth6gXbNgG8KdW7dQmm7WACZq7p9uHIs6khXO+ZuCmWBHgxvW1MXs80fyUBUdwUjLkDiKHsGcnP8Bg9GjeYDEb0iAO9oavPnAhJVAQQjOlRUJnbiaHInGUgtBiU5KQEkORCA78iRI12U4ODFCKS+HSMcSVcfeGlC3sjIyCE5QcFvI/WFCGZWnJKqPvgsTCZLTrfbXZho/ze+t7f3fG1tLVZIsOnQ7CbCpKkP7TQcWgfUb6PEwkfqC5HC70zVkxT18RD84H/IwaDFuAAAAABJRU5ErkJggg==", alt: "Stripe", role: "presentation" }));
}
const StripeApp = react.memo(({ total, currency, stripePublishableKey, returnUrl, createPaymentIntentApi, stripePaymentMode }) => {
    const options = react.useMemo(() => ({
        mode: 'payment',
        currency: currency.toLowerCase(),
        amount: Number((0,zero_decimal_currencies_dist/* default */.Ay)(total, currency)),
        capture_method: stripePaymentMode === 'capture' ? 'automatic_async' : 'manual'
    }), [total, currency, stripePaymentMode]);
    return (react.createElement("div", { className: "stripe__app py-3" },
        react.createElement(react_stripe_umd.Elements, { stripe: stripeLoader(stripePublishableKey), options: options },
            react.createElement(CheckoutForm, { stripePublishableKey: stripePublishableKey, returnUrl: returnUrl, createPaymentIntentApi: createPaymentIntentApi }))));
});
function StripeMethod({ setting, cart: { grandTotal, currency }, returnUrl, createPaymentIntentApi }) {
    const { registerPaymentComponent } = useCheckoutDispatch();
    (0,react.useEffect)(() => {
        registerPaymentComponent('stripe', {
            nameRenderer: () => (react.createElement("div", { className: "flex items-center justify-between w-full" },
                react.createElement("span", null, setting.stripeDisplayName),
                react.createElement(Cards, { width: 100 }))),
            formRenderer: () => (react.createElement(StripeApp, { total: grandTotal.value, currency: currency, stripePublishableKey: setting.stripePublishableKey, returnUrl: returnUrl, createPaymentIntentApi: createPaymentIntentApi, stripePaymentMode: setting.stripePaymentMode })),
            checkoutButtonRenderer: () => {
                const { checkout } = useCheckoutDispatch();
                const { loadingStates, orderPlaced } = useCheckout();
                const handleClick = async (e) => {
                    e.preventDefault();
                    const validateStripe = window === null || window === void 0 ? void 0 : window.validateStripePayment;
                    if (validateStripe) {
                        await validateStripe();
                    }
                    // If validation passed, proceed with order placement
                    await checkout();
                };
                const isDisabled = loadingStates.placingOrder || orderPlaced;
                return (react.createElement(Button_Button, { variant: 'default', size: 'xl', type: "button", onClick: handleClick, disabled: isDisabled, className: "w-full bg-linear-to-r from-indigo-500 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:from-indigo-500 disabled:to-purple-600" },
                    react.createElement("span", { className: "flex items-center justify-center space-x-2" }, loadingStates.placingOrder ? (react.createElement(react.Fragment, null,
                        react.createElement("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" },
                            react.createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                            react.createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })),
                        react.createElement("span", null, _('Processing Payment...')))) : orderPlaced ? (react.createElement(react.Fragment, null,
                        react.createElement("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24" },
                            react.createElement("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" })),
                        react.createElement("span", null, _('Order Placed')))) : (react.createElement(react.Fragment, null,
                        react.createElement("span", null, _('Pay with Stripe')),
                        react.createElement("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 24 24" },
                            react.createElement("path", { d: "M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" })))))));
            }
        });
    }, [registerPaymentComponent, setting.stripeDisplayName]);
    return null;
}
const Stripe_layout = {
    areaId: 'checkoutForm',
    sortOrder: 10
};
const Stripe_query = (/* unused pure expression or super */ null && (`
  query Query {
    setting {
      stripeDisplayName
      stripePublishableKey
      stripePaymentMode
    }
    cart: myCart {
      grandTotal {
        value
      }
      currency
    }
    returnUrl: url(routeId: "stripeReturn")
    createPaymentIntentApi: url(routeId: "createPaymentIntent")
  }
`));
//# sourceMappingURL=Stripe.js.map
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
;// ./.evershop/build/frontStore/checkout/client/entry.js

      
      
      
      
      



















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
    e5da57d53: {
      id: 'e5da57d53',
      sortOrder: 10,
      component: { default: CheckoutPage }
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
  checkoutForm: {
    e4fcb1ed9: {
      id: 'e4fcb1ed9',
      sortOrder: 10,
      component: { default: CashOnDeliveryMethod }
    },
    e5a031cf3: {
      id: 'e5a031cf3',
      sortOrder: 10,
      component: { default: PaypalMethod }
    },
    e6a8e07cd: {
      id: 'e6a8e07cd',
      sortOrder: 10,
      component: { default: StripeMethod }
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
/******/ 		__webpack_require__.j = 1154;
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
/******/ 			1154: 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [4286], () => (__webpack_require__(38136)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;