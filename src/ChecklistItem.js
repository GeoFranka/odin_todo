class ChecklistItem {

    id;
    name;
    done;

    constructor(name, id, done){
        this.name = name;
        this.id = id || crypto.randomUUID();
        this.done = !!done;
    }

}

export default ChecklistItem;