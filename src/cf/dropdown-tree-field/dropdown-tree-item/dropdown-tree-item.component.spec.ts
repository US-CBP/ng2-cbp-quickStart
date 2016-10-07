import { CommonModule }                 from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA }       from "@angular/core";
import { FormsModule }                  from "@angular/forms";
import {
    ComponentFixture,
    TestBed
}                                       from "@angular/core/testing";

import { DropdownTreeItemComponent }    from "./dropdown-tree-item.component";
import { DropdownTreeService }          from "../dropdown-tree.service";
import { TreeNode }                     from "../tree-node.model";

let currentId = 1;

describe("DropdownTreeItemComponent", () => {
    let fixture: ComponentFixture<DropdownTreeItemComponent>;
    let component: DropdownTreeItemComponent;
    let service: DropdownTreeService;
    let expandedNodes: Set<TreeNode>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule],
            declarations: [DropdownTreeItemComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [DropdownTreeService]
        });
        fixture = TestBed.createComponent(DropdownTreeItemComponent);
        service = fixture.debugElement.injector.get(DropdownTreeService);

        spyOn(service, "highlightNode");
        spyOn(service, "selectNode");
        spyOn(service, "toggleNodeExpansion");

        component = fixture.componentInstance;
        expandedNodes = new Set<TreeNode>();
    });

    describe("for node without children", () => {
        beforeEach(() => {
            component.node = createNode();

            fixture.detectChanges();
        });

        it("on service state changes treeItemClasses contains tree--no-children", () => {
            service.setState(createNode(), createNode(), expandedNodes);

            expect(component.treeItemClasses).toEqual(jasmine.arrayContaining(["tree--no-children"]));
        });

        it("on service state changes treeItemClasses does not contain tree--has-children", () => {
            service.setState(createNode(), createNode(), expandedNodes);

            expect(component.treeItemClasses).not.toEqual(jasmine.arrayContaining(["tree--has-children"]));
        });

        it("on service state changes isExpanded is undefined", () => {
            service.setState(createNode(), createNode(), expandedNodes);

            expect(component.isExpanded).toBeUndefined();
        });

        it("on service state changes showChildren is false", () => {
            service.setState(createNode(), createNode(), expandedNodes);

            expect(component.showChildren).toBe(false);
        });

        it("on service state changes treeItemClasses contains tree--highlighted when highlightedNode is node", () => {
            service.setState(component.node, createNode(), expandedNodes);

            expect(component.treeItemClasses).toEqual(jasmine.arrayContaining(["tree--highlighted"]));
        });

        it("on service state changes treeItemClasses does not contain tree--highlighted when highlightedNode is different node", () => {
            service.setState(createNode(), createNode(), expandedNodes);

            expect(component.treeItemClasses).not.toEqual(jasmine.arrayContaining(["tree--highlighted"]));
        });

        it("on service state changes treeItemClasses contains tree--selected when selectedNode is node", () => {
            service.setState(createNode(), component.node, expandedNodes);

            expect(component.treeItemClasses).toEqual(jasmine.arrayContaining(["tree--selected"]));
        });

        it("on service state changes isSelected is true when selectedNode is node", () => {
            service.setState(createNode(), component.node, expandedNodes);

            expect(component.isSelected).toBe(true);
        });

        it("on service state changes treeItemClasses does not contain tree--selected when selectedNode is different node", () => {
            service.setState(createNode(), createNode(), expandedNodes);

            expect(component.treeItemClasses).not.toEqual(jasmine.arrayContaining(["tree--selected"]));
        });

        it("on service state changes isSelected is false when selectedNode is different node", () => {
            service.setState(createNode(), createNode(), expandedNodes);

            expect(component.isSelected).toBe(false);
        });

        it("onNodeMouseEnter should call highlightNode on service", () => {
            component.onNodeMouseEnter();

            expect(service.highlightNode).toHaveBeenCalledWith(component.node);
        });

        it("onNodeClick should call selectNode on service", () => {
            component.onNodeClick();

            expect(service.selectNode).toHaveBeenCalledWith(component.node);
        });

        it("onExpanderClick should call toggleNodeExpansion on service", () => {
            component.onExpanderClick();

            expect(service.toggleNodeExpansion).toHaveBeenCalledWith(component.node);
        });
    });

    describe("for node with children", () => {
        beforeEach(() => {
            component.node = createNode();
            component.node.children.push(createNode());

            fixture.detectChanges();
        });

        it("on service state changes treeItemClasses does not contain tree--no-children", () => {
            service.setState(createNode(), createNode(), expandedNodes);

            expect(component.treeItemClasses).not.toEqual(jasmine.arrayContaining(["tree--no-children"]));
        });

        it("on service state changes treeItemClasses contains tree--has-children", () => {
            service.setState(createNode(), createNode(), expandedNodes);

            expect(component.treeItemClasses).toEqual(jasmine.arrayContaining(["tree--has-children"]));
        });

        it("on service state changes isExpanded is false when node is not in expandedNodes", () => {
            service.setState(createNode(), createNode(), expandedNodes);

            expect(component.isExpanded).toBe(false);
        });

        it("on service state changes showChildren is false when node is not in expandedNodes", () => {
            service.setState(createNode(), createNode(), expandedNodes);

            expect(component.showChildren).toBe(false);
        });

        it("on service state changes treeItemClasses contains tree--collapsed when node is not in expandedNodes", () => {
            service.setState(createNode(), createNode(), expandedNodes);

            expect(component.treeItemClasses).toEqual(jasmine.arrayContaining(["tree--collapsed"]));
        });

        it("on service state changes treeItemClasses does not contain tree--expanded when node is not in expandedNodes", () => {
            service.setState(createNode(), createNode(), expandedNodes);

            expect(component.treeItemClasses).not.toEqual(jasmine.arrayContaining(["tree--expanded"]));
        });

        it("on service state changes isExpanded is true when node is in expandedNodes", () => {
            expandedNodes.add(component.node);

            service.setState(createNode(), createNode(), expandedNodes);

            expect(component.isExpanded).toBe(true);
        });

        it("on service state changes showChildren is true when node is in expandedNodes", () => {
            expandedNodes.add(component.node);

            service.setState(createNode(), createNode(), expandedNodes);

            expect(component.showChildren).toBe(true);
        });

        it("on service state changes treeItemClasses does not contain tree--collapsed when node is in expandedNodes", () => {
            expandedNodes.add(component.node);

            service.setState(createNode(), createNode(), expandedNodes);

            expect(component.treeItemClasses).not.toEqual(jasmine.arrayContaining(["tree--collapsed"]));
        });

        it("on service state changes treeItemClasses contains tree--expanded when node is in expandedNodes", () => {
            expandedNodes.add(component.node);

            service.setState(createNode(), createNode(), expandedNodes);

            expect(component.treeItemClasses).toEqual(jasmine.arrayContaining(["tree--expanded"]));
        });

        it("on service state changes treeItemClasses contains tree--highlighted when highlightedNode is node", () => {
            service.setState(component.node, createNode(), expandedNodes);

            expect(component.treeItemClasses).toEqual(jasmine.arrayContaining(["tree--highlighted"]));
        });

        it("on service state changes treeItemClasses does not contain tree--highlighted when highlightedNode is different node", () => {
            service.setState(createNode(), createNode(), expandedNodes);

            expect(component.treeItemClasses).not.toEqual(jasmine.arrayContaining(["tree--highlighted"]));
        });

        it("on service state changes treeItemClasses contains tree--selected when selectedNode is node", () => {
            service.setState(createNode(), component.node, expandedNodes);

            expect(component.treeItemClasses).toEqual(jasmine.arrayContaining(["tree--selected"]));
        });

        it("on service state changes isSelected is true when selectedNode is node", () => {
            service.setState(createNode(), component.node, expandedNodes);

            expect(component.isSelected).toBe(true);
        });

        it("on service state changes treeItemClasses does not contain tree--selected when selectedNode is different node", () => {
            service.setState(createNode(), createNode(), expandedNodes);

            expect(component.treeItemClasses).not.toEqual(jasmine.arrayContaining(["tree--selected"]));
        });

        it("on service state changes isSelected is false when selectedNode is different node", () => {
            service.setState(createNode(), createNode(), expandedNodes);

            expect(component.isSelected).toBe(false);
        });

        it("onNodeMouseEnter should call highlightNode on service", () => {
            component.onNodeMouseEnter();

            expect(service.highlightNode).toHaveBeenCalledWith(component.node);
        });

        it("onNodeClick should call selectNode on service", () => {
            component.onNodeClick();

            expect(service.selectNode).toHaveBeenCalledWith(component.node);
        });

        it("onExpanderClick should call toggleNodeExpansion on service", () => {
            component.onExpanderClick();

            expect(service.toggleNodeExpansion).toHaveBeenCalledWith(component.node);
        });
    });

    function createNode(): TreeNode {
        return {
            id: currentId++,
            text: "ABC",
            children: []
        };
    }
});
