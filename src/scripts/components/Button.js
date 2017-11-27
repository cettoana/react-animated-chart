import styled from 'styled-components'

const Button = styled.button`
  min-height: 32px;
  min-width: 80px;
  font-size: 16px;
  color: #00A1DE;
  border: 1px solid #00A1DE;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 0.5;
  }

  &:active {
    opacity: 1;
  }
`

export default Button
