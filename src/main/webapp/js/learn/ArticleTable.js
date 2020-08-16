class ArticleTable {

    constructor(data) {
        this.data = data
        this.elements = null;
    }

    process() {
        const getElementsArray = [];
        for(let obj of this.data) {
            getElementsArray.push(this.getElements(obj))
        }
        return getElementsArray;
    }

    getElements(obj) {
        this.elements = document.createElement("tr");
        this.elements.innerHTML = `<td class="text">${obj.voca}</td>
                <td class="text">${obj.meaning}</td>
                <td class="text">
                    <span class="text text-weight-light badge ${obj.checkReading == 1 ? 'badge-primary' : 'badge-neutral'} ">${obj.checkReading == 1 ? '완료' : '미완료'}</span>
             </td>`;
        return this.elements;
    }
}

export default ArticleTable;