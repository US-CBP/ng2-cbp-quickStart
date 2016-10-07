import { CommonModule } from "@angular/common";
import {
    CUSTOM_ELEMENTS_SCHEMA,
    SimpleChange
} from "@angular/core";
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

        it("defaults isDropdownOpen to false", () => {
            fixture.detectChanges();

            expect(component.isDropdownOpen).toBe(false);
        });

        it("defaults defaultNode to null when defaultLabel is not provided", () => {
            fixture.detectChanges();

            expect(component.defaultNode).toBe(null);
        });

        it("defaults defaultNode to not null when defaultLabel is provided", () => {
            component.defaultLabel = "Select One";

            fixture.detectChanges();

            expect(component.defaultNode).not.toBe(null);
        });

        it("defaults defaultNode text to defaultLabel when defaultLabel is provided", () => {
            component.defaultLabel = "Select One";

            fixture.detectChanges();

            expect(component.defaultNode.text).toBe(component.defaultLabel);
        });

        it("defaults defaultNode to not null when defaultLabel is not provided and selectedNode is null", () => {
            component.selectedNode = null;

            fixture.detectChanges();

            expect(component.defaultNode).not.toBe(null);
        });

        it("defaults defaultNode text to empty string when defaultLabel is not provided and selectedNode is null", () => {
            component.selectedNode = null;

            fixture.detectChanges();

            expect(component.defaultNode.text).toBe("");
        });

        it("sets selectedNode on service when selectedNode is null and defaultLabel is provided", () => {
            component.selectedNode = null;
            component.defaultLabel = "Select One";

            fixture.detectChanges();

            expect(stateSpy).toHaveBeenCalledWith(jasmine.objectContaining({ selectedNode: component.defaultNode }));
        });

        it("sets selectedNode on service when selectedNode is null and defaultLabel is not provided", () => {
            component.selectedNode = null;

            fixture.detectChanges();

            expect(stateSpy).toHaveBeenCalledWith(jasmine.objectContaining({ selectedNode: component.defaultNode }));
        });
    });

    describe("ngOnChanges", () => {
        let stateSpy: jasmine.Spy;

        beforeEach(() => {
            stateSpy = jasmine.createSpy("state");
            service.stateObservable.subscribe(stateSpy);
        });

        it("with selectedNode change sets selectedNode on service", () => {
            let selectedNode = nodes[0].children[2].children[1];
            component.selectedNode = selectedNode;
            fixture.detectChanges();
            stateSpy.calls.reset();

            let change = createSimpleChange("selectedNode", nodes[1]);
            component.ngOnChanges({ selectedNode: change });

            expect(stateSpy).toHaveBeenCalledWith(jasmine.objectContaining({ selectedNode: nodes[1] }));
        });

        it("with selectedNode change does not raise nodeSelected", () => {
            let selectedNode = nodes[0].children[2].children[1];
            component.selectedNode = selectedNode;
            fixture.detectChanges();
            stateSpy.calls.reset();

            let nodeSelected = jasmine.createSpy("nodeSelected");
            component.nodeSelected.subscribe(nodeSelected);

            let change = createSimpleChange("selectedNode", nodes[1]);
            component.ngOnChanges({ selectedNode: change });

            expect(nodeSelected).not.toHaveBeenCalled();
        });

        it("with selectedNode change sets defaultNode to not null when new selectedNode is null and defaultLabel is null", () => {
            let selectedNode = nodes[0].children[2].children[1];
            component.selectedNode = selectedNode;
            fixture.detectChanges();
            stateSpy.calls.reset();

            let change = createSimpleChange("selectedNode", null);
            component.ngOnChanges({ selectedNode: change });

            expect(component.defaultNode).not.toBe(null);
        });

        it("with selectedNode change sets selectedNode on service to defaultNode when new selectedNode is null", () => {
            let selectedNode = nodes[0].children[2].children[1];
            component.selectedNode = selectedNode;
            fixture.detectChanges();
            stateSpy.calls.reset();

            let change = createSimpleChange("selectedNode", null);
            component.ngOnChanges({ selectedNode: change });

            expect(stateSpy).toHaveBeenCalledWith(jasmine.objectContaining({ selectedNode: component.defaultNode }));
        });

        it("with selectedNode change does not raise nodeSelected when new selectedNode is null", () => {
            let selectedNode = nodes[0].children[2].children[1];
            component.selectedNode = selectedNode;
            fixture.detectChanges();
            stateSpy.calls.reset();

            let nodeSelected = jasmine.createSpy("nodeSelected");
            component.nodeSelected.subscribe(nodeSelected);

            let change = createSimpleChange("selectedNode", null);
            component.ngOnChanges({ selectedNode: change });

            expect(nodeSelected).not.toHaveBeenCalled();
        });

        it("with selectedNode change to value sets defaultNode to not null when defaultLabel is null", () => {
            component.selectedNode = null;
            fixture.detectChanges();
            stateSpy.calls.reset();

            let change = createSimpleChange("selectedNode", nodes[0].children[2].children[1]);
            component.ngOnChanges({ selectedNode: change });

            expect(component.defaultNode).toBe(null);
        });

        it("with defaultLabel change to null sets defaultNode to null when previous defaultLabel is not null", () => {
            let selectedNode = nodes[0].children[2].children[1];
            component.selectedNode = selectedNode;
            component.defaultLabel = "Select One";
            fixture.detectChanges();
            stateSpy.calls.reset();

            let change = createSimpleChange("defaultLabel", null);
            component.ngOnChanges({ defaultLabel: change });

            expect(component.defaultNode).toBe(null);
        });

        it("with defaultLabel change to null sets defaultNode to new instance when previous defaultLabel is not null and selectedNode is null", () => {
            component.selectedNode = null;
            component.defaultLabel = "Select One";
            fixture.detectChanges();
            stateSpy.calls.reset();

            let previousValue = component.defaultNode;

            let change = createSimpleChange("defaultLabel", null);
            component.ngOnChanges({ defaultLabel: change });

            expect(component.defaultNode).not.toBe(previousValue);
        });

        it("with defaultLabel change to null sets defaultNode text to empty string when previous defaultLabel is not null and selectedNode is null", () => {
            component.selectedNode = null;
            component.defaultLabel = "Select One";
            fixture.detectChanges();
            stateSpy.calls.reset();

            let change = createSimpleChange("defaultLabel", null);
            component.ngOnChanges({ defaultLabel: change });

            expect(component.defaultNode.text).toBe("");
        });

        it("with defaultLabel change to null sets selectedNode on service to new default value when previous defaultLabel is not null and selectedNode is null", () => {
            component.selectedNode = null;
            component.defaultLabel = "Select One";
            fixture.detectChanges();
            stateSpy.calls.reset();

            let change = createSimpleChange("defaultLabel", null);
            component.ngOnChanges({ defaultLabel: change });

            expect(stateSpy).toHaveBeenCalledWith(jasmine.objectContaining({ selectedNode: component.defaultNode }));
        });

        it("with defaultLabel change to null does not raise nodeSelected when previous defaultLabel is not null and selectedNode is null", () => {
            component.selectedNode = null;
            component.defaultLabel = "Select One";
            fixture.detectChanges();
            stateSpy.calls.reset();

            let nodeSelected = jasmine.createSpy("nodeSelected");
            component.nodeSelected.subscribe(nodeSelected);

            let change = createSimpleChange("defaultLabel", null);
            component.ngOnChanges({ defaultLabel: change });

            expect(nodeSelected).not.toHaveBeenCalled();
        });

        it("with defaultLabel change sets defaultNode to new instance when previous defaultLabel is not null", () => {
            let selectedNode = nodes[0].children[2].children[1];
            component.selectedNode = selectedNode;
            component.defaultLabel = "Select One";
            fixture.detectChanges();
            stateSpy.calls.reset();

            let previousValue = component.defaultNode;

            let change = createSimpleChange("defaultLabel", "New Select One");
            component.ngOnChanges({ defaultLabel: change });

            expect(component.defaultNode).not.toBe(previousValue);
        });

        it("with defaultLabel change sets defaultNode text to new value when previous defaultLabel is not null", () => {
            let selectedNode = nodes[0].children[2].children[1];
            component.selectedNode = selectedNode;
            component.defaultLabel = "Select One";
            fixture.detectChanges();
            stateSpy.calls.reset();

            let change = createSimpleChange("defaultLabel", "New Select One");
            component.ngOnChanges({ defaultLabel: change });

            expect(component.defaultNode.text).toBe("New Select One");
        });

        it("with defaultLabel change sets selectedNode on service to new default value when previous defaultLabel is not null and selectedNode is null", () => {
            component.selectedNode = null;
            component.defaultLabel = "Select One";
            fixture.detectChanges();
            stateSpy.calls.reset();

            let change = createSimpleChange("defaultLabel", "New Select One");
            component.ngOnChanges({ defaultLabel: change });

            expect(stateSpy).toHaveBeenCalledWith(jasmine.objectContaining({ selectedNode: component.defaultNode }));
        });

        it("with defaultLabel change does not raise nodeSelected when previous defaultLabel is not null and selectedNode is null", () => {
            component.selectedNode = null;
            component.defaultLabel = "Select One";
            fixture.detectChanges();
            stateSpy.calls.reset();

            let nodeSelected = jasmine.createSpy("nodeSelected");
            component.nodeSelected.subscribe(nodeSelected);

            let change = createSimpleChange("defaultLabel", "New Select One");
            component.ngOnChanges({ defaultLabel: change });

            expect(nodeSelected).not.toHaveBeenCalled();
        });

        it("with defaultLabel change sets defaultNode to not null when previous defaultLabel is null", () => {
            let selectedNode = nodes[0].children[2].children[1];
            component.selectedNode = selectedNode;
            component.defaultLabel = null;
            fixture.detectChanges();
            stateSpy.calls.reset();

            let change = createSimpleChange("defaultLabel", "Select One");
            component.ngOnChanges({ defaultLabel: change });

            expect(component.defaultNode).not.toBe(null);
        });

        it("with defaultLabel change sets defaultNode text to new value when previous defaultLabel is null", () => {
            let selectedNode = nodes[0].children[2].children[1];
            component.selectedNode = selectedNode;
            component.defaultLabel = null;
            fixture.detectChanges();
            stateSpy.calls.reset();

            let change = createSimpleChange("defaultLabel", "Select One");
            component.ngOnChanges({ defaultLabel: change });

            expect(component.defaultNode.text).toBe("Select One");
        });

        it("with defaultLabel change sets selectedNode on service to new default value when previous defaultLabel is null and selectedNode is null", () => {
            component.selectedNode = null;
            component.defaultLabel = null;
            fixture.detectChanges();
            stateSpy.calls.reset();

            let change = createSimpleChange("defaultLabel", "Select One");
            component.ngOnChanges({ defaultLabel: change });

            expect(stateSpy).toHaveBeenCalledWith(jasmine.objectContaining({ selectedNode: component.defaultNode }));
        });

        it("with defaultLabel change does not raise nodeSelected when previous defaultLabel is null and selectedNode is null", () => {
            component.selectedNode = null;
            component.defaultLabel = null;
            fixture.detectChanges();
            stateSpy.calls.reset();

            let nodeSelected = jasmine.createSpy("nodeSelected");
            component.nodeSelected.subscribe(nodeSelected);

            let change = createSimpleChange("defaultLabel", "Select One");
            component.ngOnChanges({ defaultLabel: change });

            expect(nodeSelected).not.toHaveBeenCalled();
        });

        function createSimpleChange(field: string, currentValue: any): SimpleChange {
            let previousValue = component[field];
            component[field] = currentValue;
            return {
                previousValue,
                currentValue,
                isFirstChange() {
                    return false;
                }
            }
        }
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

        it("does not raise nodeSelected when component.selectNode is null and service state.selectedNode is defaultNode", () => {
            component.selectedNode = null;

            fixture.detectChanges();

            service.setState(nodes[0], component.defaultNode, new Set<TreeNode>());

            expect(nodeSelected).not.toHaveBeenCalled();
        });

        it("raises nodeSelected with null when selectedNode changes to defaultNode", () => {
            component.defaultLabel = "Select One";
            fixture.detectChanges();

            service.setState(nodes[0], component.defaultNode, new Set<TreeNode>());

            expect(nodeSelected).toHaveBeenCalledWith(null);
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
