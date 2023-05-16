export const getStaticProps = async () => {
  const res = await fetch("/users");
  const data = await res.json();

  return {
    props: { users: data },
  };
};

const User = ({ users }) => {
  return <>{users && users.map((user) => <div>Hello</div>)}</>;
};

export default User;
