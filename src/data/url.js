import prodPath from "./prodPath";

const url = {
  isLogin: `${prodPath}/core/wp-admin/admin-ajax.php?action=is_login`,
  getUser: `${prodPath}/core/wp-admin/admin-ajax.php?action=get_user_current`,
  getDomains: `${prodPath}/core/wp-admin/admin-ajax.php?action=get_domains`,
  getRegistrators: `${prodPath}/core/wp-admin/admin-ajax.php?action=get_registrators`,
  getHostings: `${prodPath}/core/wp-admin/admin-ajax.php?action=get_hostings`,
  getEmails: `${prodPath}/core/wp-admin/admin-ajax.php?action=get_emails`,
  loginPage: `${prodPath}/core/wp-admin/`,
  updateStatus: (status, id) => {
    return `${prodPath}/core/wp-admin/admin-ajax.php?action=update_status&status=${status}&id=${id}`;
  },
};

export default url;
