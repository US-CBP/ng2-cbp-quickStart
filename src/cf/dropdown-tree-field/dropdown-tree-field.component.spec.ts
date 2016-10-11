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

        it("defaults containerClasses to empty array", () => {
            fixture.detectChanges();

            expect(component.containerClasses).toEqual([]);
        });

        it("defaults ariaOwnsId to undefined", () => {
            fixture.detectChanges();

            expect(component.ariaOwnsId).toBeUndefined();
        });

        it("defaults ariaActiveDescendentId to undefined", () => {
            fixture.detectChanges();

            expect(component.ariaActiveDescendentId).toBeUndefined();
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

        it("sets selectedText to selectedNode text when showFullSelectedPath is false and selectedNode is not null", () => {
            component.showFullSelectedPath = false;

            fixture.detectChanges();

            expect(component.selectedText).toBe(selectedNode.text);
        });

        it("sets selectedText to defaultLabel when showFullSelectedPath is false and selectedNode is null", () => {
            component.selectedNode = null;
            component.defaultLabel = "Select One";
            component.showFullSelectedPath = false;

            fixture.detectChanges();

            expect(component.selectedText).toBe(component.defaultLabel);
        });

        it("sets selectedText to selectedNode text preceded by parent nodes' text when showFullSelectedPath is true and selectedNode is not null", () => {
            component.showFullSelectedPath = true;

            fixture.detectChanges();

            expect(component.selectedText).toBe(`${nodes[0].text} / ${nodes[0].children[2].text} / ${selectedNode.text}`);
        });

        it("sets selectedText to defaultLabel when showFullSelectedPath is true and selectedNode is null", () => {
            component.selectedNode = null;
            component.defaultLabel = "Select One";
            component.showFullSelectedPath = true;

            fixture.detectChanges();

            expect(component.selectedText).toBe(component.defaultLabel);
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

        it("with selectedNode change sets selectedText", () => {
            let selectedNode = nodes[0].children[2].children[1];
            component.selectedNode = selectedNode;
            fixture.detectChanges();

            let change = createSimpleChange("selectedNode", nodes[1]);
            component.ngOnChanges({ selectedNode: change });

            expect(component.selectedText).toBe(nodes[1].text);
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

        it("with selectedNode change sets selectedText to defaultNode text when new selectedNode is null", () => {
            let selectedNode = nodes[0].children[2].children[1];
            component.selectedNode = selectedNode;
            fixture.detectChanges();
            stateSpy.calls.reset();

            let change = createSimpleChange("selectedNode", null);
            component.ngOnChanges({ selectedNode: change });

            expect(component.selectedText).toBe(component.defaultNode.text);
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

        it("with defaultLabel change to null sets selectedText to new defaultNode text when previous defaultLabel is not null and selectedNode is null", () => {
            component.selectedNode = null;
            component.defaultLabel = "Select One";
            fixture.detectChanges();
            stateSpy.calls.reset();

            let change = createSimpleChange("defaultLabel", null);
            component.ngOnChanges({ defaultLabel: change });

            expect(component.selectedText).toBe(component.defaultNode.text);
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

        it("with defaultLabel change sets selectedText to new defaultNode text when previous defaultLabel is not null and selectedNode is null", () => {
            component.selectedNode = null;
            component.defaultLabel = "Select One";
            fixture.detectChanges();
            stateSpy.calls.reset();

            let change = createSimpleChange("defaultLabel", "New Select One");
            component.ngOnChanges({ defaultLabel: change });

            expect(component.selectedText).toBe(component.defaultNode.text);
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

        it("with defaultLabel change sets selectedText to new defaultNode text when previous defaultLabel is null and selectedNode is null", () => {
            component.selectedNode = null;
            component.defaultLabel = null;
            fixture.detectChanges();
            stateSpy.calls.reset();

            let change = createSimpleChange("defaultLabel", "Select One");
            component.ngOnChanges({ defaultLabel: change });

            expect(component.selectedText).toBe(component.defaultNode.text);
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

        it("does not change selectedText when selectedNode changes", () => {
            fixture.detectChanges();
            let previousValue = component.selectedText;

            service.setState(nodes[0], nodes[1], new Set<TreeNode>());

            expect(component.selectedText).toBe(previousValue);
        });
    });

    describe("onComboboxFocus", () => {
        beforeEach(() => {
            fixture.detectChanges();

            component.containerClasses.push("existing-class");
        });

        it("adds focusClass when containerClasses does not contain focusClass", () => {
            component.onComboboxFocus();

            expect(component.containerClasses).toEqual(["existing-class", DropdownTreeFieldComponent.focusClass]);
        });

        it("does not add another focusClass when containerClasses does contains focusClass", () => {
            component.containerClasses.push(DropdownTreeFieldComponent.focusClass);

            component.onComboboxFocus();

            expect(component.containerClasses).toEqual(["existing-class", DropdownTreeFieldComponent.focusClass]);
        });
    });

    describe("onComboboxBlur", () => {
        beforeEach(() => {
            fixture.detectChanges();

            component.containerClasses.push("existing-class");
        });

        it("does not change containerClasses when containerClasses does not contain focusClass", () => {
            component.onComboboxBlur();

            expect(component.containerClasses).toEqual(["existing-class"]);
        });

        it("removes focusClass when containerClasses does contains focusClass", () => {
            component.containerClasses.push(DropdownTreeFieldComponent.focusClass);

            component.onComboboxBlur();

            expect(component.containerClasses).toEqual(["existing-class"]);
        });
    });

    describe("onComboboxClick", () => {
        beforeEach(() => {
            fixture.detectChanges();
        });

        describe("when closed", () => {
            it("sets isDropdownOpen to true", () => {
                component.onComboboxClick();

                expect(component.isDropdownOpen).toBe(true);
            });

            it("sets containerClasses to contain focusClass and openClass", () => {
                component.onComboboxClick();

                expect(component.containerClasses).toEqual([DropdownTreeFieldComponent.focusClass, DropdownTreeFieldComponent.openClass]);
            });

            it("sets ariaOwnsId to id of the tree element", () => {
                component.onComboboxClick();

                expect(component.ariaOwnsId).toBe(component.treeId);
            });

            it("highlights selectedNode when visible", () => {
                let selectedNode = nodes[0].children[2].children[1];
                let expandedNodes = new Set<TreeNode>([
                    nodes[0],
                    nodes[0].children[2],
                    nodes[0].children[2].children[1]]);
                service.setState(null, selectedNode, expandedNodes);
                component.selectedNode = selectedNode;

                let stateSpy = jasmine.createSpy("state");
                service.stateObservable.subscribe(stateSpy);
                stateSpy.calls.reset();

                component.onComboboxClick();

                expect(stateSpy).toHaveBeenCalledWith(jasmine.objectContaining({ highlightedNode: selectedNode }));
            });

            it("highlights first node when selectedNode is not visible and defaultNode does not exist", () => {
                let selectedNode = nodes[0].children[2].children[1];
                let expandedNodes = new Set<TreeNode>([nodes[0]]);
                service.setState(null, selectedNode, expandedNodes);
                component.selectedNode = selectedNode;
                component.defaultNode = null;

                let stateSpy = jasmine.createSpy("state");
                service.stateObservable.subscribe(stateSpy);
                stateSpy.calls.reset();

                component.onComboboxClick();

                expect(stateSpy).toHaveBeenCalledWith(jasmine.objectContaining({ highlightedNode: nodes[0] }));
            });

            it("highlights defaultNode when selectedNode is not visible and defaultNode exists", () => {
                let selectedNode = nodes[0].children[2].children[1];
                let expandedNodes = new Set<TreeNode>([nodes[0]]);
                service.setState(null, selectedNode, expandedNodes);
                component.selectedNode = selectedNode;
                component.defaultNode = createNode();

                let stateSpy = jasmine.createSpy("state");
                service.stateObservable.subscribe(stateSpy);
                stateSpy.calls.reset();

                component.onComboboxClick();

                expect(stateSpy).toHaveBeenCalledWith(jasmine.objectContaining({ highlightedNode: component.defaultNode }));
            });

            it("sets ariaActiveDescendentId to highlightedNode element id", () => {
                let selectedNode = nodes[0].children[2].children[1];
                let expandedNodes = new Set<TreeNode>([
                    nodes[0],
                    nodes[0].children[2],
                    nodes[0].children[2].children[1]]);
                service.setState(null, selectedNode, expandedNodes);
                component.selectedNode = selectedNode;

                component.onComboboxClick();

                expect(component.ariaActiveDescendentId).toBe(service.createTreeItemId(component.treeItemIdPrefix, selectedNode));
            });
        });

        describe("when open", () => {
            beforeEach(() => {
                component.onComboboxClick();
            });

            it("sets isDropdownOpen to false", () => {
                component.onComboboxClick();

                expect(component.isDropdownOpen).toBe(false);
            });

            it("sets containerClasses to only contain focusClass", () => {
                component.onComboboxClick();

                expect(component.containerClasses).toEqual([DropdownTreeFieldComponent.focusClass]);
            });

            it("sets ariaOwnsId to undefined", () => {
                component.onComboboxClick();

                expect(component.ariaOwnsId).toBeUndefined();
            });

            it("sets ariaActiveDescendentId to undefined", () => {
                component.onComboboxClick();

                expect(component.ariaActiveDescendentId).toBeUndefined();
            });
        });
    });

    describe("onComboboxKeydown", () => {
        beforeEach(() => {
            component.defaultLabel = "Select One";

            fixture.detectChanges();
        });

        describe("when closed", () => {
            it("Alt+ArrowDown opens the dropdown", () => {
                let $event = new KeyboardEvent("keydown", {
                    altKey: true,
                    key: "ArrowDown"
                });

                component.onComboboxKeydown($event);

                expect(component.isDropdownOpen).toBe(true);
            });
        });

        describe("when open", () => {
            beforeEach(() => {
                component.onComboboxClick();
            });

            it("Alt+ArrowUp closes the dropdown", () => {
                let $event = new KeyboardEvent("keydown", {
                    altKey: true,
                    key: "ArrowUp"
                });

                component.onComboboxKeydown($event);

                expect(component.isDropdownOpen).toBe(false);
            });

            it("Escape closes the dropdown", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "Escape"
                });

                component.onComboboxKeydown($event);

                expect(component.isDropdownOpen).toBe(false);
            });

            it("ArrowUp highlights previous visible node of current highlighted node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowUp"
                });
                service.setState(nodes[1], nodes[2], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().highlightedNode).toBe(nodes[0]);
            });

            it("ArrowUp selects previous visible node of current highlighted node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowUp"
                });
                service.setState(nodes[1], nodes[2], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().selectedNode).toBe(nodes[0]);
            });

            it("ArrowUp does not change highlighted node when current highlighted node is first visible node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowUp"
                });
                service.setState(component.defaultNode, nodes[2], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().highlightedNode).toBe(component.defaultNode);
            });

            it("ArrowUp does not change selected node when current highlighted node is first visible node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowUp"
                });
                service.setState(component.defaultNode, nodes[2], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().selectedNode).toBe(nodes[2]);
            });

            it("Ctrl+ArrowUp highlights previous visible node of current highlighted node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowUp",
                    ctrlKey: true
                });
                service.setState(nodes[1], nodes[2], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().highlightedNode).toBe(nodes[0]);
            });

            it("Ctrl+ArrowUp does not change selected node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowUp",
                    ctrlKey: true
                });
                service.setState(nodes[1], nodes[2], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().selectedNode).toBe(nodes[2]);
            });

            it("Ctrl+ArrowUp does not change highlighted node when current highlighted node is first visible node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowUp",
                    ctrlKey: true
                });
                service.setState(component.defaultNode, nodes[2], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().highlightedNode).toBe(component.defaultNode);
            });

            it("Ctrl+ArrowUp does not change selected node when current highlighted node is first visible node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowUp",
                    ctrlKey: true
                });
                service.setState(component.defaultNode, nodes[2], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().selectedNode).toBe(nodes[2]);
            });

            it("ArrowDown highlights next visible node of current highlighted node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowDown"
                });
                service.setState(nodes[1], nodes[0], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().highlightedNode).toBe(nodes[2]);
            });

            it("ArrowDown selects next visible node of current highlighted node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowDown"
                });
                service.setState(nodes[1], nodes[0], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().selectedNode).toBe(nodes[2]);
            });

            it("ArrowDown does not change highlighted node when current highlighted node is last visible node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowDown"
                });
                service.setState(nodes[2], nodes[0], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().highlightedNode).toBe(nodes[2]);
            });

            it("ArrowDown does not change selected node when current highlighted node is last visible node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowDown"
                });
                service.setState(nodes[2], nodes[0], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().selectedNode).toBe(nodes[0]);
            });

            it("Ctrl+ArrowDown highlights next visible node of current highlighted node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowDown",
                    ctrlKey: true
                });
                service.setState(nodes[1], nodes[0], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().highlightedNode).toBe(nodes[2]);
            });

            it("Ctrl+ArrowDown does not change selected node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowDown",
                    ctrlKey: true
                });
                service.setState(nodes[1], nodes[0], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().selectedNode).toBe(nodes[0]);
            });

            it("Ctrl+ArrowDown does not change highlighted node when current highlighted node is last visible node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowDown",
                    ctrlKey: true
                });
                service.setState(nodes[2], nodes[0], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().highlightedNode).toBe(nodes[2]);
            });

            it("Ctrl+ArrowDown does not change selected node when current highlighted node is last visible node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowDown",
                    ctrlKey: true
                });
                service.setState(nodes[2], nodes[0], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().selectedNode).toBe(nodes[0]);
            });

            it("ArrowLeft does not change highlighted node when current highlighted node is expanded", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowLeft"
                });
                service.setState(nodes[0].children[1], nodes[2], new Set<TreeNode>([
                    nodes[0],
                    nodes[0].children[1]
                ]));

                component.onComboboxKeydown($event);

                expect(service.currentState().highlightedNode).toBe(nodes[0].children[1]);
            });

            it("ArrowLeft does not change selected node when current highlighted node is expanded", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowLeft"
                });
                service.setState(nodes[0].children[1], nodes[2], new Set<TreeNode>([
                    nodes[0],
                    nodes[0].children[1]
                ]));

                component.onComboboxKeydown($event);

                expect(service.currentState().selectedNode).toBe(nodes[2]);
            });

            it("ArrowLeft collapses current highlighted node when current highlighted node is expanded", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowLeft"
                });
                service.setState(nodes[0].children[1], nodes[2], new Set<TreeNode>([
                    nodes[0],
                    nodes[0].children[1]
                ]));

                component.onComboboxKeydown($event);

                expect(service.currentState().expandedNodes.has(nodes[0].children[1])).toBe(false);
            });

            it("ArrowLeft changes highlighted node to parent of current highlighted node when current highlighted node is collapsed", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowLeft"
                });
                service.setState(nodes[0].children[1], nodes[2], new Set<TreeNode>([nodes[0]]));

                component.onComboboxKeydown($event);

                expect(service.currentState().highlightedNode).toBe(nodes[0]);
            });

            it("ArrowLeft changes selected node to parent of current highlighted node when current highlighted node is collapsed", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowLeft"
                });
                service.setState(nodes[0].children[1], nodes[2], new Set<TreeNode>([nodes[0]]));

                component.onComboboxKeydown($event);

                expect(service.currentState().selectedNode).toBe(nodes[0]);
            });

            it("ArrowLeft does not change highlighted node when current highlighted node is collapsed and has no parent", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowLeft"
                });
                service.setState(nodes[0], nodes[2], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().highlightedNode).toBe(nodes[0]);
            });

            it("ArrowLeft does not change selected node when current highlighted node is collapsed and has no parent", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowLeft"
                });
                service.setState(nodes[0], nodes[2], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().selectedNode).toBe(nodes[2]);
            });

            it("ArrowRight does not change highlighted node when current highlighted node is collapsed", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowRight"
                });
                service.setState(nodes[0], nodes[2], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().highlightedNode).toBe(nodes[0]);
            });

            it("ArrowRight does not change selected node when current highlighted node is collapsed", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowRight"
                });
                service.setState(nodes[0], nodes[2], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().selectedNode).toBe(nodes[2]);
            });

            it("ArrowRight expands current highlighted node when current highlighted node is collapsed", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowRight"
                });
                service.setState(nodes[0], nodes[2], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().expandedNodes.has(nodes[0])).toBe(true);
            });

            it("ArrowRight changes highlighted node to first child of the current highlighted node when current highlighted node is expanded", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowRight"
                });
                service.setState(nodes[0], nodes[2], new Set<TreeNode>([nodes[0]]));

                component.onComboboxKeydown($event);

                expect(service.currentState().highlightedNode).toBe(nodes[0].children[0]);
            });

            it("ArrowRight changes selected node to first child of the current highlighted node when current highlighted node is expanded", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowRight"
                });
                service.setState(nodes[0], nodes[2], new Set<TreeNode>([nodes[0]]));

                component.onComboboxKeydown($event);

                expect(service.currentState().selectedNode).toBe(nodes[0].children[0]);
            });

            it("ArrowRight does not change highlighted node when current highlighted node has no children", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowRight"
                });
                service.setState(nodes[0], nodes[2], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().highlightedNode).toBe(nodes[0]);
            });

            it("ArrowRight does not change selected node when current highlighted node has no children", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "ArrowRight"
                });
                service.setState(nodes[0], nodes[2], new Set<TreeNode>([]));

                component.onComboboxKeydown($event);

                expect(service.currentState().selectedNode).toBe(nodes[2]);
            });

            it("Home changes highlighted node to first visible node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "Home"
                });
                service.setState(nodes[0].children[1], nodes[2], new Set<TreeNode>([nodes[0]]));

                component.onComboboxKeydown($event);

                expect(service.currentState().highlightedNode).toBe(component.defaultNode);
            });

            it("Home changes selected node to first visible node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "Home"
                });
                service.setState(nodes[0].children[1], nodes[2], new Set<TreeNode>([nodes[0]]));

                component.onComboboxKeydown($event);

                expect(service.currentState().selectedNode).toBe(component.defaultNode);
            });

            it("Ctrl+Home changes highlighted node to first visible node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "Home",
                    ctrlKey: true
                });
                service.setState(nodes[0].children[1], nodes[2], new Set<TreeNode>([nodes[0]]));

                component.onComboboxKeydown($event);

                expect(service.currentState().highlightedNode).toBe(component.defaultNode);
            });

            it("Ctrl+Home does not change selected node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "Home",
                    ctrlKey: true
                });
                service.setState(nodes[0].children[1], nodes[2], new Set<TreeNode>([nodes[0]]));

                component.onComboboxKeydown($event);

                expect(service.currentState().selectedNode).toBe(nodes[2]);
            });

            it("End changes highlighted node to last visible node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "End"
                });
                service.setState(nodes[0].children[1], nodes[0], new Set<TreeNode>([nodes[0]]));

                component.onComboboxKeydown($event);

                expect(service.currentState().highlightedNode).toBe(nodes[2]);
            });

            it("End changes selected node to last visible node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "End"
                });
                service.setState(nodes[0].children[1], nodes[0], new Set<TreeNode>([nodes[0]]));

                component.onComboboxKeydown($event);

                expect(service.currentState().selectedNode).toBe(nodes[2]);
            });

            it("Ctrl+End changes highlighted node to last visible node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "End",
                    ctrlKey: true
                });
                service.setState(nodes[0].children[1], nodes[0], new Set<TreeNode>([nodes[0]]));

                component.onComboboxKeydown($event);

                expect(service.currentState().highlightedNode).toBe(nodes[2]);
            });

            it("Ctrl+End does not change selected node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: "End",
                    ctrlKey: true
                });
                service.setState(nodes[0].children[1], nodes[0], new Set<TreeNode>([nodes[0]]));

                component.onComboboxKeydown($event);

                expect(service.currentState().selectedNode).toBe(nodes[0]);
            });

            it("Space changes selected node to current highlighted node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: " "
                });
                service.setState(nodes[0].children[1], nodes[2], new Set<TreeNode>([nodes[0]]));

                component.onComboboxKeydown($event);

                expect(service.currentState().selectedNode).toBe(nodes[0].children[1]);
            });

            it("Ctrl+Space changes selected node to current highlighted node", () => {
                let $event = new KeyboardEvent("keydown", {
                    key: " ",
                    ctrlKey: true
                });
                service.setState(nodes[0].children[1], nodes[2], new Set<TreeNode>([nodes[0]]));

                component.onComboboxKeydown($event);

                expect(service.currentState().selectedNode).toBe(nodes[0].children[1]);
            });
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
            ),
            createNode()
        ];
    }
});
