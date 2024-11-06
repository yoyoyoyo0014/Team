package kr.kh.ebook.pagination;

public class ReportCriteria extends Criteria {

    public ReportCriteria() {
        super();
    }

    public ReportCriteria(int page, int perPageNum) {
        super(page, perPageNum);
    }
}
