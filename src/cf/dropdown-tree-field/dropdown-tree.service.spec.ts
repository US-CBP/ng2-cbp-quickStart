import { DropdownTreeService } from "./dropdown-tree.service";
import { TreeNode } from "./tree-node.model";

let currentId = 1;

describe("DropdownTreeService", () => {
    let service: DropdownTreeService;
    let highlightedNode: TreeNode;
    let selectedNode: TreeNode;
    let expandedNodes: Set<TreeNode>;
    let observer: jasmine.Spy;

    beforeEach(() => {
        highlightedNode = createNode();
        selectedNode = createNode();
        expandedNodes = new Set<TreeNode>();
        service = new DropdownTreeService();
        observer = jasmine.createSpy("observer");

        service.setState(highlightedNode, selectedNode, expandedNodes);
        service.stateObservable.subscribe(observer);
        observer.calls.reset();
    });

    describe("highlightNode", () => {
        it("does not notify observers when node is already highlighted", () => {
            service.highlightNode(highlightedNode);

            expect(observer).not.toHaveBeenCalled();
        });

        it("notifies observers when new node is highlighted", () => {
            let newNode = createNode();

            service.highlightNode(newNode);

            expect(observer).toHaveBeenCalledWith({ highlightedNode: newNode, selectedNode: selectedNode, expandedNodes: expandedNodes });
        });
    });

    describe("selectNode", () => {
        it("does not notify observers when node is already selected", () => {
            service.selectNode(selectedNode);

            expect(observer).not.toHaveBeenCalled();
        });

        it("notifies observers when new node is selected", () => {
            let newNode = createNode();

            service.selectNode(newNode);

            expect(observer).toHaveBeenCalledWith({ highlightedNode: highlightedNode, selectedNode: newNode, expandedNodes: expandedNodes });
        });
    });

    describe("expandNode", () => {
        it("does not notify observers when node has no children", () => {
            let node = createNode();

            service.expandNode(node);

            expect(observer).not.toHaveBeenCalled();
        });

        it("does not notify observers when node is already expanded", () => {
            let node = createNode();
            node.children.push(createNode());
            expandedNodes.add(node);

            service.expandNode(node);

            expect(observer).not.toHaveBeenCalled();
        });

        it("notifies observers when node is collapsed", () => {
            let node = createNode();
            node.children.push(createNode());

            service.expandNode(node);

            expect(observer).toHaveBeenCalledWith({
                asymmetricMatch(actual) {
                    return actual.highlightedNode === highlightedNode &&
                        actual.selectedNode === selectedNode &&
                        actual.expandedNodes.has(node);
                }
            });
        });
    });

    describe("collapseNode", () => {
        it("does not notify observers when node has no children", () => {
            let node = createNode();
            expandedNodes.add(node);

            service.collapseNode(node);

            expect(observer).not.toHaveBeenCalled();
        });

        it("does not notify observers when node is already collapsed", () => {
            let node = createNode();
            node.children.push(createNode());

            service.collapseNode(node);

            expect(observer).not.toHaveBeenCalled();
        });

        it("notifies observers when node is expanded", () => {
            let node = createNode();
            node.children.push(createNode());
            expandedNodes.add(node);

            service.collapseNode(node);

            expect(observer).toHaveBeenCalledWith({
                asymmetricMatch(actual) {
                    return actual.highlightedNode === highlightedNode &&
                        actual.selectedNode === selectedNode &&
                        !actual.expandedNodes.has(node);
                }
            });
        });
    });

    describe("toggleNodeExpansion", () => {
        it("does not notify observers when node has no children", () => {
            let node = createNode();

            service.toggleNodeExpansion(node);

            expect(observer).not.toHaveBeenCalled();
        });

        it("notifies observers when node is collapsed", () => {
            let node = createNode();
            node.children.push(createNode());

            service.toggleNodeExpansion(node);

            expect(observer).toHaveBeenCalledWith({
                asymmetricMatch(actual) {
                    return actual.highlightedNode === highlightedNode &&
                        actual.selectedNode === selectedNode &&
                        actual.expandedNodes.has(node);
                }
            });
        });

        it("notifies observers when node is expanded", () => {
            let node = createNode();
            node.children.push(createNode());
            expandedNodes.add(node);

            service.toggleNodeExpansion(node);

            expect(observer).toHaveBeenCalledWith({
                asymmetricMatch(actual) {
                    return actual.highlightedNode === highlightedNode &&
                        actual.selectedNode === selectedNode &&
                        !actual.expandedNodes.has(node);
                }
            });
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