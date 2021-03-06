import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 175px;
  font-size: 14px;
`;

export const MenuHeaderLabel = styled.p`
  overflow-x: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  white-space: nowrap;
`;

export const MenuHeader = styled.button<{
  noBorder?: boolean;
  isSelected?: boolean;
}>`
  &:hover {
    ${({ noBorder }) =>
      !noBorder &&
      `  box-shadow: 0px 4px 12px rgba(122, 122, 122, 0.08);

`}
  }
  cursor: pointer;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background-color: white;
  border: ${({ isSelected, noBorder, theme }) =>
    !noBorder
      ? (isSelected ? "2px" : "1px") + " solid " + theme.colors.inputBorder
      : "none"};
  padding: 0 15px;
  color: ${({ theme }) => theme.colors.lightPurple};
  transition: box-shadow 300ms;
`;

export const MenuList = styled.div`
  position: absolute;
  z-index: 3;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  max-height: 126px;
  overflow: auto;
  box-shadow: 0px 4px 12px #80808073;
`;

export const MenuItem = styled.div<{ disabled?: boolean }>`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.lightPurple};
  padding: 9px;
  :hover {
    background: ${({ theme }) => theme.colors.hoverDropDown};
  }
  ${({ disabled }) =>
    disabled
      ? `
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.4;x
  `
      : ``}
`;

export const StyledLabel = styled.div`
  cursor: default;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.lightPurple};
  padding: 9px;
`;
