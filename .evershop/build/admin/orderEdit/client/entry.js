
      import React from 'react';
      import ReactDOM from 'react-dom';
      import { Area } from '@evershop/evershop/components/common';
      import {HydrateAdmin} from '@evershop/evershop/components/common';
      
import e5ff59c35 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/auth/pages/admin/all/AdminUser.js';
import e7af11667 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/base/pages/admin/all/FormCss.js';
import e03c5f5ba from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/base/pages/admin/all/GlobalCss.js';
import e2be61ec2 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/base/pages/admin/all/Layout.js';
import e6c640cc3 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/base/pages/admin/all/Meta.js';
import e01fa0885 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/base/pages/admin/all/TailwindCss.js';
import e2252096f from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/catalog/pages/admin/all/CatalogMenuGroup.js';
import e03a11002 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/catalog/pages/admin/all/NewProductQuickLink.js';
import e2ed34ff0 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/checkout/pages/admin/all/ShippingSettingMenu.js';
import e59719b71 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/cms/pages/admin/all/CmsMenuGroup.js';
import e52431361 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/cms/pages/admin/all/CopyRight.js';
import e4865135d from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/cms/pages/admin/all/Logo.js';
import e4da0ae6c from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/cms/pages/admin/all/Navigation.js';
import e0e4a071d from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/cms/pages/admin/all/Notification.js';
import e5c7a3adc from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/cms/pages/admin/all/QuickLinks.js';
import e6c0a83c3 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/cms/pages/admin/all/SearchBox.js';
import e6a88d8f2 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/cms/pages/admin/all/Survey.js';
import e19b3198e from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/cms/pages/admin/all/Version.js';
import e078e5cf8 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/cod/pages/admin/orderEdit/CaptureButton.js';
import e2859f9a9 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/customer/pages/admin/all/CustomerMenuGroup.js';
import e61e39389 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/oms/pages/admin/all/OmsMenuGroup.js';
import e70619842 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/oms/pages/admin/orderEdit/Activities.js';
import e67e32699 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/oms/pages/admin/orderEdit/AddTrackingButton.js';
import e4e06afff from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/oms/pages/admin/orderEdit/CancelButton.js';
import e1a0008d3 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/oms/pages/admin/orderEdit/Customer.js';
import e28b59fc0 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/oms/pages/admin/orderEdit/CustomerNotes.js';
import e6206071d from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/oms/pages/admin/orderEdit/Items.js';
import e4dfd8d61 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/oms/pages/admin/orderEdit/Layout.js';
import e764c5346 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/oms/pages/admin/orderEdit/MarkDeliveredButton.js';
import e1dbb8a50 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/oms/pages/admin/orderEdit/PageHeading.js';
import e4275ba23 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/oms/pages/admin/orderEdit/Payment.js';
import e688cfc83 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/oms/pages/admin/orderEdit/ShipButton.js';
import e24852399 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/oms/pages/admin/orderEdit/Status.js';
import e0ef5f09e from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/oms/pages/admin/orderEdit/TrackingButton.js';
import e7c8c2348 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/paypal/pages/admin/orderEdit/PaypalCaptureButton.js';
import e7d98dd4e from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/promotion/pages/admin/all/CouponMenuGroup.js';
import e0560d3df from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/promotion/pages/admin/all/NewCouponQuickLink.js';
import e3b127666 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/setting/pages/admin/all/PaymentSettingMenu.js';
import e3a71d701 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/setting/pages/admin/all/SettingMenuGroup.js';
import e34640001 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/setting/pages/admin/all/StoreSettingMenu.js';
import e53179988 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/stripe/pages/admin/orderEdit/StripeCaptureButton.js';
import e6ea9d724 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/stripe/pages/admin/orderEdit/StripeRefundButton.js';
import e6279c81a from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/tax/pages/admin/all/TaxSettingMenu.js';
import e281f9e5a from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/catalog/components/CollectionProductsSetting.js';
import e5077e91a from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/cms/components/TextBlockSetting.js';
import e15549945 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/cms/components/BasicMenuSetting.js';
import e5a2d2c97 from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/cms/components/BannerSetting.js';
import e221633bd from 'file:///D:/+%20Berijalan%20QC/Training%20QC/myEverShop/node_modules/@evershop/evershop/dist/modules/cms/components/SlideshowSetting.js';
Area.defaultProps.components = {
  header: {
    e5ff59c35: {
      id: 'e5ff59c35',
      sortOrder: 50,
      component: { default: e5ff59c35 }
    },
    e4865135d: {
      id: 'e4865135d',
      sortOrder: 10,
      component: { default: e4865135d }
    },
    e6c0a83c3: {
      id: 'e6c0a83c3',
      sortOrder: 20,
      component: { default: e6c0a83c3 }
    }
  },
  head: {
    e7af11667: {
      id: 'e7af11667',
      sortOrder: 5,
      component: { default: e7af11667 }
    },
    e03c5f5ba: {
      id: 'e03c5f5ba',
      sortOrder: 5,
      component: { default: e03c5f5ba }
    },
    e6c640cc3: {
      id: 'e6c640cc3',
      sortOrder: 5,
      component: { default: e6c640cc3 }
    },
    e01fa0885: {
      id: 'e01fa0885',
      sortOrder: 1,
      component: { default: e01fa0885 }
    }
  },
  body: {
    e2be61ec2: {
      id: 'e2be61ec2',
      sortOrder: 10,
      component: { default: e2be61ec2 }
    },
    e0e4a071d: {
      id: 'e0e4a071d',
      sortOrder: 10,
      component: { default: e0e4a071d }
    }
  },
  adminMenu: {
    e2252096f: {
      id: 'e2252096f',
      sortOrder: 20,
      component: { default: e2252096f }
    },
    e59719b71: {
      id: 'e59719b71',
      sortOrder: 60,
      component: { default: e59719b71 }
    },
    e5c7a3adc: {
      id: 'e5c7a3adc',
      sortOrder: 10,
      component: { default: e5c7a3adc }
    },
    e2859f9a9: {
      id: 'e2859f9a9',
      sortOrder: 40,
      component: { default: e2859f9a9 }
    },
    e61e39389: {
      id: 'e61e39389',
      sortOrder: 30,
      component: { default: e61e39389 }
    },
    e7d98dd4e: {
      id: 'e7d98dd4e',
      sortOrder: 50,
      component: { default: e7d98dd4e }
    },
    e3a71d701: {
      id: 'e3a71d701',
      sortOrder: 500,
      component: { default: e3a71d701 }
    }
  },
  quickLinks: {
    e03a11002: {
      id: 'e03a11002',
      sortOrder: 20,
      component: { default: e03a11002 }
    },
    e0560d3df: {
      id: 'e0560d3df',
      sortOrder: 30,
      component: { default: e0560d3df }
    }
  },
  settingPageMenu: {
    e2ed34ff0: {
      id: 'e2ed34ff0',
      sortOrder: 15,
      component: { default: e2ed34ff0 }
    },
    e3b127666: {
      id: 'e3b127666',
      sortOrder: 10,
      component: { default: e3b127666 }
    },
    e34640001: {
      id: 'e34640001',
      sortOrder: 5,
      component: { default: e34640001 }
    },
    e6279c81a: {
      id: 'e6279c81a',
      sortOrder: 20,
      component: { default: e6279c81a }
    }
  },
  footerLeft: {
    e52431361: {
      id: 'e52431361',
      sortOrder: 10,
      component: { default: e52431361 }
    },
    e19b3198e: {
      id: 'e19b3198e',
      sortOrder: 20,
      component: { default: e19b3198e }
    }
  },
  adminNavigation: {
    e4da0ae6c: {
      id: 'e4da0ae6c',
      sortOrder: 10,
      component: { default: e4da0ae6c }
    }
  },
  content: {
    e6a88d8f2: {
      id: 'e6a88d8f2',
      sortOrder: 999,
      component: { default: e6a88d8f2 }
    },
    e4dfd8d61: {
      id: 'e4dfd8d61',
      sortOrder: 10,
      component: { default: e4dfd8d61 }
    },
    e1dbb8a50: {
      id: 'e1dbb8a50',
      sortOrder: 5,
      component: { default: e1dbb8a50 }
    }
  },
  orderPaymentActions: {
    e078e5cf8: {
      id: 'e078e5cf8',
      sortOrder: 10,
      component: { default: e078e5cf8 }
    },
    e7c8c2348: {
      id: 'e7c8c2348',
      sortOrder: 10,
      component: { default: e7c8c2348 }
    },
    e53179988: {
      id: 'e53179988',
      sortOrder: 10,
      component: { default: e53179988 }
    },
    e6ea9d724: {
      id: 'e6ea9d724',
      sortOrder: 10,
      component: { default: e6ea9d724 }
    }
  },
  leftSide: {
    e70619842: {
      id: 'e70619842',
      sortOrder: 30,
      component: { default: e70619842 }
    },
    e6206071d: {
      id: 'e6206071d',
      sortOrder: 10,
      component: { default: e6206071d }
    },
    e4275ba23: {
      id: 'e4275ba23',
      sortOrder: 20,
      component: { default: e4275ba23 }
    }
  },
  order_actions: {
    e67e32699: {
      id: 'e67e32699',
      sortOrder: 5,
      component: { default: e67e32699 }
    },
    e764c5346: {
      id: 'e764c5346',
      sortOrder: 10,
      component: { default: e764c5346 }
    },
    e688cfc83: {
      id: 'e688cfc83',
      sortOrder: 10,
      component: { default: e688cfc83 }
    },
    e0ef5f09e: {
      id: 'e0ef5f09e',
      sortOrder: 15,
      component: { default: e0ef5f09e }
    }
  },
  pageHeadingRight: {
    e4e06afff: {
      id: 'e4e06afff',
      sortOrder: 35,
      component: { default: e4e06afff }
    }
  },
  rightSide: {
    e1a0008d3: {
      id: 'e1a0008d3',
      sortOrder: 15,
      component: { default: e1a0008d3 }
    },
    e28b59fc0: {
      id: 'e28b59fc0',
      sortOrder: 10,
      component: { default: e28b59fc0 }
    }
  },
  pageHeadingLeft: {
    e24852399: {
      id: 'e24852399',
      sortOrder: 200,
      component: { default: e24852399 }
    }
  },
  '*': {
    e281f9e5a: {
      id: 'e281f9e5a',
      sortOrder: 0,
      component: { default: e281f9e5a }
    },
    e5077e91a: {
      id: 'e5077e91a',
      sortOrder: 0,
      component: { default: e5077e91a }
    },
    e15549945: {
      id: 'e15549945',
      sortOrder: 0,
      component: { default: e15549945 }
    },
    e5a2d2c97: {
      id: 'e5a2d2c97',
      sortOrder: 0,
      component: { default: e5a2d2c97 }
    },
    e221633bd: {
      id: 'e221633bd',
      sortOrder: 0,
      component: { default: e221633bd }
    }
  }
} 
ReactDOM.hydrate(
        React.createElement(HydrateAdmin, null),
        document.getElementById('app')
      );