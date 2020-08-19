class ArticleTable {

    constructor(data) {
        this.data = data
        this.count = 0;
        this.elements = null;
        // const delBox =  document.querySelectorAll('input[name=tableDel]');
    }

    process() {
        const getElementsArray = [];
        if(this.data.length > 0) {
            for(let obj of this.data) {
                getElementsArray.push(this.getElements(obj))
            }
        } else {
            getElementsArray.push(this.getElements(null))
        }

        return getElementsArray;
    }

    getTableInformation(groupNumber) {
        return `<span>[단어세트${groupNumber}]의 목록</span>
                <span class="table-word-set-count">(${this.data.length})</span>`
    }

    getInputElement(group) {
        const _element = document.createElement("tr");
        _element.dataset.userLearning = this.data[0].user_learning_seq;
        _element.dataset.articleSeq = this.data[0].article_seq;
        _element.dataset.group = group;
        _element.innerHTML = `
            <td>
                <i class="icon_plus"></i>
            </td>
            <td>
                <input type="text" class="form-control learning__table-input" id="tableAddVoca"/>
            </td>
            <td colspan="2">
                <input type="text" class="form-control learning__table-input" id="tableAddMeaning" placeholder="뜻"/>
            </td>
            <td>
                <button class="btn learning__table active" id="wordSave">
                    <i class="icon_check"></i>
                </button>
                <button class="btn" id="addElementRemove" id="elemRemove">
                    <i class="icon_close"></i>
                </button>
            </td>`
        return _element;
    }

    getElements(obj, type) {
        this.elements = document.createElement("tr");

        if(obj != null) {
            this.elements.dataset.vocaSeq = obj.user_voca_seq
            if(type == 'update') {
                return `
                    <td>
                        <i class="icon_plus"></i>
                    </td>
                    <td>
                        <input type="text" class="form-control learning__table-input" name="voca" value="${obj[0].voca}"/>
                    </td>
                    <td colspan="2">
                        <input type="text" class="form-control learning__table-input" name="meaning" placeholder="뜻" value="${obj[0].meaning}"/>
                    </td>
                    <td class="tableWordUpdate">
                        <button class="btn learning__table active" id="updateWord">
                            <i class="icon_check"></i>
                        </button>
                        <button class="btn" id="addElementRemove" id="updateWordRemove">
                            <i class="icon_close"></i>
                        </button>
                    </td>`
            } else if(type == 'remove') {
                return `<td>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" name="tableDel" id="tableAllCheck${obj.voca_order}" class="custom-control-input learning-table-checkbox">
                            <label class="custom-control-label" for="tableAllCheck${obj.voca_order}"></label>
                    </div>
                </td>
                <td class="text">${obj.voca}</td>
                <td class="text">${obj.meaning}</td>
                <td class="text">
                    <span class="text text-weight-light badge ${obj.check_reading == 1 ? 'badge-primary' : 'badge-neutral'} ">${obj.check_reading == 1 ? '완료' : '미완료'}</span>
                </td>
                <td class="learn__wordOne">
                    <i class="icon_pen"></i>
                    <i class="icon_trash"></i>
                </td>`;
            } else {
                this.elements.innerHTML = `
                    <td>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" name="tableDel" id="tableAllCheck${obj.voca_order}" class="custom-control-input learning-table-checkbox">
                            <label class="custom-control-label" for="tableAllCheck${obj.voca_order}"></label>
                        </div>
                    </td>
                    <td class="text">${obj.voca}</td>
                        <td class="text">${obj.meaning}</td>
                        <td class="text">
                            <span class="text text-weight-light badge ${obj.check_reading == 1 ? 'badge-primary' : 'badge-neutral'} ">${obj.check_reading == 1 ? '완료' : '미완료'}</span>
                     </td>
                     <td class="learn__wordOne">
                        <i class="icon_pen"></i>
                        <i class="icon_trash"></i>
                     </td>`;
            }

        } else {
            this.elements.innerHTML = `<td class="text text-center" colspan="5">등록 된 단어가 없습니다.</td>`;
        }
        return this.elements;
    }
}

export default ArticleTable;