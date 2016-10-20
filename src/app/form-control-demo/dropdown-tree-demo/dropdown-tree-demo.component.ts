import { Component } from '@angular/core';

let currentId = 1;

@Component({
    templateUrl: 'dropdown-tree-demo.component.html'
})
export class DropdownTreeDemoComponent {
    nodes = this.createNodes();

    demo1SelectedNode = null;
    demo2SelectedNode = null;

    demo1NodeSelected(node) {
        this.demo1SelectedNode = node;
    }

    demo2NodeSelected(node) {
        this.demo2SelectedNode = node;
    }

    createNode(text, ...children) {
        let id = currentId++;

        return {
            id: id,
            text: text,
            children: children
        };
    }

    private createNodes() {
        return [
            this.createNode('Root 1'),
            this.createNode('Root 2',
                this.createNode('Root 2 Child 1'),
                this.createNode('Root 2 Child 2',
                    this.createNode('Root 2 Grandchild 1')
                )
            ),
            this.createNode('Root 3',
                this.createNode('Root 3 Child 1'),
                this.createNode('Root 3 Child 2',
                    this.createNode('Root 3 Grandchild 1'),
                    this.createNode('Root 3 Grandchild 2',
                        this.createNode('Root 3 Great-Grandchild 1')
                    ),
                    this.createNode('Root 3 Grandchild 3')
                )
            )
        ];
    }
}
