import React from 'react';
import styled from '@emotion/styled';
import CryptoChart from './CryptoChart';

const WalletContainer = styled.div`
    padding-left: 50px;
    margin-top: 20px;
    margin-bottom: 20px;
    height: 100vh;
    width: 80vw;
    display: flex;
    flex-direction: column;
`;

const BalanceContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 50px;
    justify-content: initial;
    padding: 50px 0 50px 20px;
    font-size: 2em;
    background-color: #30507F;
    color: white;
    font-family: "Liberation Mono", monospace;
`;

const StyledButton = styled.button`
    border: none;
    background-color: Transparent;
    font-size: 1em;
    padding-top: 15px;
    color: black;
    &:hover {
        font-weight: bold;
        cursor: pointer;
        color: blue;
    }
`;

const SubTitle = styled.div`
    margin-top: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding-left: 5px;
    font-size: 1.2em;
`;

const AssetWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
`;

const StyledTable = styled.table`   
    width: 100%;
    border: 1px solid #EAE8E6;
    border-collapse: collapse;
    background-color: rgb(246, 249, 252);
    font-size: 1.1em;
`;
const StyledRow = styled.tr`
    display: grid;
    grid-template-columns: 2fr 4fr 1fr;
`;

const MenuItemWrapper = styled.div`
    height: 50px;
    font-size: 1em;
    display: flex;
    justify-content: initial;
    align-items: center;
    padding-left: 10px;
    ${'' /* width: 40vw; */}
`;

const BalanceItemWrapper = styled.div`
    padding-right: 30px;
`;

const AssetItemWrapper = styled.div`
    color: grey;
`;

const AssetList = (props) => {
    const { data, myUSD, refetch, curAsset, onViewChartClick } = props;

    const curBalance = (asset) => {
        
        const result = data.find(item => item.name === curAsset[asset].name);
        return parseFloat(result.price * curAsset[asset].total_num).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const displayAssets = () => {
        return Object.keys(curAsset).slice(1).map((asset, index) => 
            <StyledTable key={`${asset}-${index}`}>
                <tbody>
                    <StyledRow>
                        <td>
                            <MenuItemWrapper>{curAsset[asset].name}</MenuItemWrapper>
                        </td>
                        <td>
                            <MenuItemWrapper>
                                <BalanceItemWrapper>${curBalance(asset)} </BalanceItemWrapper>
                                <AssetItemWrapper>{`${curAsset[asset].total_num.toFixed(6)} ${asset}`}</AssetItemWrapper>
                            </MenuItemWrapper>
                        </td>  
                        <td>
                            <StyledButton onClick={onViewChartClick(curAsset[asset])}><i className="fas fa-chart-line"></i></StyledButton>
                            
                        </td>
                    </StyledRow>
                </tbody>
            </StyledTable>
        );
    };

    return (
        <WalletContainer>     
            <div>
                <StyledButton onClick={() => refetch()}>Refresh</StyledButton>
            </div>   
            <BalanceContainer>
                <div>Cash Balance: </div>
                <div>${myUSD.toLocaleString()}</div>
            </BalanceContainer>
            <div>
                <SubTitle>Your Assets</SubTitle>
            </div>
            <AssetWrapper>
                <StyledTable>
                    <tbody>
                        <StyledRow>
                            <th><MenuItemWrapper>Asset</MenuItemWrapper></th>
                            <th><MenuItemWrapper>Balance</MenuItemWrapper></th>        
                        </StyledRow>
                    </tbody>
                </StyledTable>
                {displayAssets()}
            </AssetWrapper> 
        </WalletContainer>
    );
};

export default AssetList;