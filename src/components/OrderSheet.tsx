import { Wrapper } from "./StyledAuth.ts";
import Grid from "@toast-ui/react-grid";

export function OrderSheet() {
  const data = [
    {
      orderDate: "2023.10.20 09:31:15",
      gubun: "가입(월납)",
      company: "가나상사",
      companyNo: "111-12-12345",
      pcUserCount: "2",
      appUserCount: "2",
      price: "44,000",
      outputDate: "2023.11.01",
      endDate: "2099.12.31",
      state: "신청완료",
      sendBtn: "전송하기",
      detailBtn: "보기",
    },
    {
      orderDate: "2023.10.20 09:31:15",
      gubun: "가입(월납)",
      company: "가나상사",
      companyNo: "111-12-12345",
      pcUserCount: "2",
      appUserCount: "2",
      price: "44,000",
      outputDate: "2023.11.01",
      endDate: "2099.12.31",
      state: "신청완료",
      sendBtn: "전송하기",
      detailBtn: "보기",
    },
    {
      orderDate: "2023.10.20 09:31:15",
      gubun: "가입(월납)",
      company: "가나상사",
      companyNo: "111-12-12345",
      pcUserCount: "2",
      appUserCount: "2",
      price: "44,000",
      outputDate: "2023.11.01",
      endDate: "2099.12.31",
      state: "신청완료",
      sendBtn: "전송하기",
      detailBtn: "보기",
    },
    {
      orderDate: "2023.10.20 09:31:15",
      gubun: "가입(월납)",
      company: "가나상사",
      companyNo: "111-12-12345",
      pcUserCount: "2",
      appUserCount: "2",
      price: "44,000",
      outputDate: "2023.11.01",
      endDate: "2099.12.31",
      state: "신청완료",
      sendBtn: "전송하기",
      detailBtn: "보기",
    },
    {
      orderDate: "2023.10.20 09:31:15",
      gubun: "가입(월납)",
      company: "가나상사",
      companyNo: "111-12-12345",
      pcUserCount: "2",
      appUserCount: "2",
      price: "44,000",
      outputDate: "2023.11.01",
      endDate: "2099.12.31",
      state: "신청완료",
      sendBtn: "",
      detailBtn: "보기",
    },
  ];

  const columns = [
    { name: "orderDate", header: "신청일자" },
    { name: "gubun", header: "구분" },
    { name: "company", header: "상호" },
    { name: "companyNo", header: "사업자번호" },
    { name: "pcUserCount", header: "PC 유저수" },
    { name: "appUserCount", header: "앱 유저수" },
    { name: "price", header: "금액" },
    { name: "outputDate", header: "출금시작일" },
    { name: "endDate", header: "종료(만기)일" },
    { name: "state", header: "진행상태" },
    { name: "sendBtn", header: "신청서" },
    { name: "detailBtn", header: "상세보기" },
  ];
  const onClick = () => {
    console.log("onClick");
  };
  return (
    <Wrapper>
      <Grid
        data={data}
        columns={columns}
        rowHeight={25}
        width={1000}
        bodyHeight={500}
        heightResizable={true}
        rowHeaders={["rowNum"]}
        usageStatistics={false}
        onClick={onClick}
      />
    </Wrapper>
  );
}
