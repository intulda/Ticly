class AdminClientSearch {
    constructor(rownum, email, nickname, auth, signup_type, reg_date, del, marketing_agree) {
        this.rownum = rownum;
        this.email = email;
        this.nickname = nickname;
        this.auth = auth;
        this.signup_type = signup_type;
        this.reg_date = reg_date;
        this.del = del;
        this.marketing_agree = marketing_agree;
        this.element = document.createElement("tr");
    }

    getElements() {
        this.element.className = "Admin_Client_Search";
        this.element.innerHTML = `
                                    <td class="text">${this.rownum}</td>
                                    <td class="text">
                                        ${this.auth === 0 ? `<div class="badge badge-neutral">관리자</div>` : `<div class="badge badge-primary">사용자</div>`}
                                    </td>
                                    <td class="text">${this.email}</td>
                                    <td class="text">${this.nickname}</td>
                                    <td class="text">${this.del === 0 ? `일반` : `탈퇴`}</td>
                                    <td class="text">${this.signup_type}</td>
                                    <td class="text">${this.marketing_agree === 0 ? `거부` : `허용`}</td>
                                    <td class="text">${this.reg_date}</td>
                                    <td class="text">${this.reg_date}</td>
                                    <td class="clientUpdateDeleteButton">
                                        <i class="icon_pen md"></i>
                                    </td>`;
        return this.element
    }
}

export default AdminClientSearch;


