import styled from "styled-components";

export const StyledContainer = styled.div`
  height: 47px;
  display: flex;
  & > div:not(:last-child) {
    margin-inline-end: 20px;
  }

`;
