export function OrderSheet() {
    return (
        <Sheet>
            <Cell>
                <Label>제품 구분</Label>
                <Text>클라우드 신규 가입 ( 월납 ) </Text>
            </Cell>
            <Cell>
                <Label>거래처</Label>
                <MemberSearch />
                <Label>사업자번호</Label>
                <Input name='companyNo' required />
            </Cell>
            <Cell>
                <Label>PC 유저수</Label>
                <Input name='pcUser' required />
            </Cell>
            <Cell>
                <Label>APP 유저수</Label>
                <Input name='appUser' required />
            </Cell>
            <Cell>
                <Label>정상가</Label>
                <Input name='price' required />
            </Cell>
            <Cell>
                <Label>딜러가</Label>
                <Input name='dealerPrice' required />
            </Cell>
            <Cell>
                <Label>클라우드 ID</Label>
                <Input name='cloudId' required />
            </Cell>
            <Cell>
                <Label>클라우드 PW</Label>
                <Input name='cloudPw' required />
            </Cell>
            <Input type='submit' value='신청하기' />
        </Sheet>
    )
}