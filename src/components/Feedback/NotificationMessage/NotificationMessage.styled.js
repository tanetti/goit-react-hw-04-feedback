import styled from 'styled-components';

export const Notification = styled.p`
  margin: ${({ theme }) => theme.space[0]};
  margin-bottom: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[0]};

  font-size: ${({ theme }) => theme.fontSizes.l};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  text-align: center;
`;
