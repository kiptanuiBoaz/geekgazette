export interface PaginationProps {
    currentPage:number;
    setCurrentPage:(pageNumber:number) => void;
    postsPerPage:number;
    totalPosts:number;

}