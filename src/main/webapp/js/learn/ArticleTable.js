class ArticleTable {

    constructor(data) {
        this.data = data
        this.count = 0;
        this.elements = null;
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

    getElements(obj) {
        this.elements = document.createElement("tr");
        if(obj != null) {
            this.elements.innerHTML = `<td class="text">${obj.voca}</td>
                <td class="text">${obj.meaning}</td>
                <td class="text">
                    <span class="text text-weight-light badge ${obj.check_reading == 1 ? 'badge-primary' : 'badge-neutral'} ">${obj.check_reading == 1 ? '완료' : '미완료'}</span>
             </td>`;
        } else {
            this.elements.innerHTML = `<td class="text text-center" colspan="3">등록 된 단어가 없습니다.</td>`;
        }
        return this.elements;
    }
}

export default ArticleTable;