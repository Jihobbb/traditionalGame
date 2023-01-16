import styled from "styled-components";

const Mw = {};

Mw.Container = styled.div`
  width: 1000px;
  height: 600px;
  margin: auto;
`;

Mw.Btn = styled.div`
  width: 50px;
  height: 50px;
  padding: 1px;
  margin: 3px;
  display: inline-block;
  text-align: center;
  line-height: 50px;
  border: 1px solid black;
  background-color: ${({ active }) => (active ? "yellowgreen" : "")};
`;

export { Mw };
