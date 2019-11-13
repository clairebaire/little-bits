// to-do.js

class ToDoApp {
    constructor(items) {
        this.items = items;
        console.info(`To Do\n\nAvailable methods:\n.add(name, resolved) - adds a task and if it is resolved or not\n.remove(id) - removes a task from the list\n.resolve(id) - resolves a task by the number next to it in .print() output\n.unresolve(id) - unresolves a task by the number next to it in .print() output\n.print() - print all tasks, resolved or not`);
        this.initialize();
    }

    initialize() {
        let retrieved = this.retrieve();
        if (retrieved) {
            console.log(`%cItems retrieved from LocalStorage`, "color: green; font-style: italic;");
            this.items = retrieved;
        } else {
            this.items = [];
        }
    }

    add(name, resolved) {
        let id = 0;
        if (this.items.length === 0) {
            id = 1;
        } else { 
            id = this.items[this.items.length - 1].id + 1; 
        }
        
        this.items.push({id, name, resolved});
        this.save(this.items);
        console.log(`%cAdded ${resolved ? 'resolved task' : 'unresolved task'} '${name}'`, "color: green; font-style: italic;");
    }

    remove(id) {
        let removedItem = this.items.find((item) => item.id === id);
        this.items = this.items.filter((item) => item.id !== id);
        this.save(this.items);
        console.log(`%cRemoved task '${removedItem.name}'`, "color: red; font-style: italic;");
    }

    resolve(id) {
        let toResolve = this.items.findIndex((item) => item.id === id);
        this.items[toResolve].resolved = true;
        this.save(this.items);
        console.log(`%cResolved task '${this.items[toResolve].name}'`, "color: blue; font-style: italic;");
    }

    unresolve(id) {
        let toResolve = this.items.findIndex((item) => item.id === id);
        this.items[toResolve].resolved = false;
        this.save(this.items);
        console.log(`%cMarked task '${this.items[toResolve].name}' as unresolved.`, "color: blue; font-style: italic;");
    }

    save() {
        if (!window.localStorage) {
            return;
        }
        localStorage.setItem('todo', JSON.stringify(this.items));
    }

    retrieve() {
        if (!window.localStorage) {
            return;
        }
        let retrieved = localStorage.getItem('todo');
        return JSON.parse(retrieved);
    }

    print() {
        console.info('To Do:');
        this.items.forEach((item) => {
            if (item.resolved) {
                console.log(`%c${item.id} ${item.name}`,  "color: '#666'; font-style: italic; text-decoration: line-through; ");
            } else {
                console.log(`${item.id} ${item.name}`);
            }
        });
    }
}
