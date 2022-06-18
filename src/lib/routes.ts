// NOTE: those function can also be used server-side, for instance in mails
export const routes = {
  home: {
    href: "/",
  },
  account: {
    root: {
      href: "/account",
    },
    forgottenPassword: {
      href: "/account/forgotten-password",
    },
    resetPassword: {
      href: "/account/reset-password",
    },
    verifyEmail: {
      href: "/account/verify-email",
    },
    login: {
      href: "/account/login",
    },
    signup: {
      href: "/account/signup",
    },
    profile: {
      href: "/account/profile",
    }
  },
  kelvin: {
    index: {
      href: "/kelvin/index"
    },
    detail: {
      href: "/kelvin/detail" //TODO: add props somehow
    },
    orgexample: {
      href: "/kelvin/org_example"
    },
    projexample: {
      href: "/kelvin/proj_example"
    },
    processtemplateexample: {
      href: "/routes/kelvin/process_template_example"
    },
    processexample: {
      href: "/routes/kelvin/process_example"
    },
    stepexample: {
      href: "/routes/kelvin/step_example"
    },
    stepinstanceexample: {
      href: "/routes/kelvin/step_instance_example"
    }
  }
};
