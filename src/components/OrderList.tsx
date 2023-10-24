import { Wrapper } from "./StyledAuth.ts";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import TuiGrid from "tui-grid";
import { useState } from "react";
import styled from "styled-components";

TuiGrid.setLanguage("ko");
TuiGrid.applyTheme("clean");

const SearchBar = styled.div`
  display: flex;
`;
const SearchLabel = styled.label``;
const SearchDate = styled.input``;
const SearchDateBtn = styled.button``;
export function OrderList() {
  const [orderDate, setOrderDate] = useState();
  const [outputDate, setOutputDate] = useState();
  const [gubun, setGubun] = useState();
  const [orderState, setOrderState] = useState();
  const [searchCompany, setSearchCompany] = useState();

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
      _attributes: {
        className: {
          // row: ["red"],
          column: {
            state: ["red"],
            sendBtn: ["sendBtn"],
            detailBtn: ["detailBtn"],
          },
        },
      },
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
      state: "신청서전송완료",
      sendBtn: "전송하기",
      detailBtn: "보기",
      _attributes: {
        className: {
          // row: ["red"],
          column: {
            state: ["green"],
            sendBtn: ["sendBtn"],
            detailBtn: ["detailBtn"],
          },
        },
      },
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
      state: "본사등록완료",
      sendBtn: "전송하기",
      detailBtn: "보기",
      _attributes: {
        className: {
          // row: ["red"],
          column: {
            state: ["blue"],
            sendBtn: ["sendBtn"],
            detailBtn: ["detailBtn"],
          },
        },
      },
    },
    {
      orderDate: "2023.10.20 09:31:15",
      gubun: "가입(월납)",
      company: "가나상사",
      companyNo: "111-12-12345",
      pcUserCount: "3",
      appUserCount: "3",
      price: "44,000",
      outputDate: "2023.11.01",
      endDate: "2099.12.31",
      state: "신청완료",
      sendBtn: "보류",
      detailBtn: "보기",
      _attributes: {
        className: {
          // row: ["red"],
          column: {
            state: ["gray"],
            sendBtn: ["sendBtn"],
            detailBtn: ["detailBtn"],
          },
        },
      },
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
      state: "취소",
      detailBtn: "보기",
      _attributes: {
        className: {
          column: {
            state: ["gray"],
            sendBtn: ["sendBtn"],
            detailBtn: ["detailBtn"],
          },
        },
      },
    },
  ];
  const columns = [
    {
      name: "orderDate",
      header: "신청일자",
      sortable: true,
      sortingType: "desc",
      align: "left",
    },
    {
      name: "gubun",
      header: "구분",
      sortable: true,
      sortingType: "desc",
      align: "left",
    },
    {
      name: "company",
      header: "상호",
      sortable: true,
      sortingType: "desc",
      align: "left",
    },
    {
      name: "companyNo",
      header: "사업자번호",
      sortable: true,
      sortingType: "desc",
      align: "left",
    },
    {
      name: "pcUserCount",
      header: "PC 유저수",
      sortable: true,
      sortingType: "desc",
      align: "right",
    },
    {
      name: "appUserCount",
      header: "앱 유저수",
      sortable: true,
      sortingType: "desc",
      align: "right",
    },
    {
      name: "price",
      header: "금액",
      sortable: true,
      sortingType: "desc",
      align: "right",
    },
    {
      name: "outputDate",
      header: "출금시작일",
      sortable: true,
      sortingType: "desc",
      align: "left",
    },
    {
      name: "endDate",
      header: "종료(만기)일",
      sortable: true,
      sortingType: "desc",
      align: "left",
    },
    {
      name: "state",
      header: "진행상태",
      sortable: true,
      sortingType: "desc",
      align: "center",
    },
    { name: "sendBtn", header: "신청서", align: "center" },
    { name: "detailBtn", header: "상세보기", align: "center" },
  ];
  const onClick = (e) => {
    console.log(e);
    const { columnName } = e;
    if (columnName === "sendBtn") {
    }
    console.log("onClick");
  };
  return (
    <Wrapper>
      <Grid
        data={data}
        columns={columns}
        columnOptions={{ resizable: true }}
        minRowHeight={30}
        rowHeight={20}
        width={1200}
        minBodyHeight={100}
        // heightResizable={true}
        rowHeaders={[{ type: "rowNum", align: "right" }]}
        usageStatistics={false}
        onClick={onClick}
        scrollX={false}
        // scrollY={false}
      />
    </Wrapper>
  );
}
