import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
    ComponentFixture,
    TestBed
} from "@angular/core/testing";

import { DropdownTreeFieldComponent } from "./dropdown-tree-field.component";
import { DropdownTreeService } from "./dropdown-tree.service";
import { TreeNode } from "./tree-node.model";

let currentId = 1;

describe("DropdownTreeItemComponent", () => {
    let fixture: ComponentFixture<DropdownTreeFieldComponent>;
    let component: DropdownTreeFieldComponent;
    let service: DropdownTreeService;
    let nodes: TreeNode[];

    beforeEach(() => {
        nodes = createNodeTree();

        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule],
            declarations: [DropdownTreeFieldComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [DropdownTreeService]
        });
        fixture = TestBed.createComponent(DropdownTreeFieldComponent);
        service = fixture.debugElement.injector.get(DropdownTreeService);

        component = fixture.componentInstance;
        component.nodes = nodes;
    });

    describe("ngOnInit", () => {
        let selectedNode: TreeNode;
        let stateSpy: jasmine.Spy;

        beforeEach(() => {
            selectedNode = nodes[0].children[2].children[1];
            component.selectedNode = selectedNode;

            stateSpy = jasmine.createSpy("state");
            service.stateObservable.subscribe(stateSpy);
            stateSpy.calls.reset();
        });

        it("sets selectedNode on service", () => {
            fixture.detectChanges();

            expect(stateSpy).toHaveBeenCalledWith(jasmine.objectContaining({ selectedNode: selectedNode }));
        });

        it("expands nodes to selectedNode on service", () => {
            fixture.detectChanges();

            expect(stateSpy).toHaveBeenCalledWith({
                asymmetricMatch(actual) {
                    return actual.expandedNodes.size === 2 &&
                        actual.expandedNodes.has(nodes[0]) &&
                        actual.expandedNodes.has(nodes[0].children[2]);
                }
            });
        });

        it("expands no nodes on service when selectedNode is null", () => {
            component.selectedNode = null;

            fixture.detectChanges();

            expect(stateSpy).toHaveBeenCalledWith({
                asymmetricMatch(actual) {
                    return actual.expandedNodes.size === 0;
                }
            });
        });
    });

    describe("on state change on service", () => {
        let selectedNode: TreeNode;
        let nodeSelected: jasmine.Spy;

        beforeEach(() => {
            selectedNode = nodes[0].children[2].children[1];
            component.selectedNode = selectedNode;

            nodeSelected = jasmine.createSpy("nodeSelected");
            component.nodeSelected.subscribe(nodeSelected);
        });

        it("does not raise nodeSelected when selectNode does not change", () => {
            fixture.detectChanges();

            service.setState(nodes[0], selectedNode, new Set<TreeNode>());

            expect(nodeSelected).not.toHaveBeenCalled();
        });

        it("raises nodeSelected when selectedNode changes", () => {
            fixture.detectChanges();

            service.setState(nodes[0], nodes[1], new Set<TreeNode>());

            expect(nodeSelected).toHaveBeenCalledWith(nodes[1]);
        });

        it("does not change component.selectedNode directly when selectedNode changes", () => {
            fixture.detectChanges();

            service.setState(nodes[0], nodes[1], new Set<TreeNode>());

            expect(component.selectedNode).toEqual(selectedNode);
        });

        it("does not raise nodeSelected when selectNode changes between null and undefined", () => {
            component.selectedNode = null;

            fixture.detectChanges();

            service.setState(nodes[0], undefined, new Set<TreeNode>());

            expect(nodeSelected).not.toHaveBeenCalled();
        });
    });

    function createNode(...children: TreeNode[]): TreeNode {
        let id = currentId++;

        return {
            id: id,
            text: "ABC-" + id,
            children: children
        };
    }

    function createNodeTree(): TreeNode[] {
        return [
            createNode(
                createNode(),
                createNode(
                    createNode(),
                    createNode()
                ),
                createNode(
                    createNode(),
                    createNode(
                        createNode()
                    ),
                    createNode()
                )
            ),
            createNode(
                createNode(
                    createNode()
                )
            )
        ];
    }
});
