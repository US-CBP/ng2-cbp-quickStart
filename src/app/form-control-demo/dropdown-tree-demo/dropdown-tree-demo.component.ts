import { Component } from "@angular/core";

@Component({
    templateUrl: "dropdown-tree-demo.component.html"
})
export class DropdownTreeDemoComponent {
    demo1 = this.createDemo1();
    demo1SelectedNode = null;

    private createDemo1() {
        return {
            id: "demo-1",
            label: "Demo 1",
            defaultLabel: "Any Value",
            showFullSelectedPath: false,
            selectedNode: this.demo1SelectedNode,
            nodes: [
                {
                    id: 1,
                    text: "Root 1",
                    children: []
                },
                {
                    id: 2,
                    text: "Root 2",
                    children: [
                        {
                            id: 4,
                            text: "Root 2 Child 1",
                            children: []
                        },
                        {
                            id: 5,
                            text: "Root 2 Child 2",
                            children: [
                                {
                                    id: 6,
                                    text: "Root 2 Grandchild 1",
                                    children: []
                                },
                            ]
                        }
                    ]
                },
                {
                    id: 3,
                    text: "Root 3",
                    children: []
                }
            ],
            nodeSelected(node) {
                this.demo1SelectedNode = node;
            }
        }
    }
}
