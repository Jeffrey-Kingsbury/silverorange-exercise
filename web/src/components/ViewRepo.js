import styled from 'styled-components';

const ViewRepo = ({ data, setSelectedRepo }) => {
  return (
    <Wrapper
      onClick={() => {
        setSelectedRepo(false);
      }}
    >
      {data.name}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 90%;
  height: 800px;
`;
export default ViewRepo;
