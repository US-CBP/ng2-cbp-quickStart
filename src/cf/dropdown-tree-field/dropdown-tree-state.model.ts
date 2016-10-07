import { TreeNode } from "./tree-node.model";

export interface DropdownTreeState {
    highlightedNode: TreeNode;
    selectedNode: TreeNode;
    expandedNodes: Set<TreeNode>;
}
