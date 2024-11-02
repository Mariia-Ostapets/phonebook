import DocumentTitle from "../../components/DocumentTitle";

const styles = {
  container: {
    minHeight: "calc(100vh - 50px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontWeight: 500,
    fontSize: 48,
    textAlign: "center",
    marginBottom: 48,
    marginTop: 48,
  },
  description: {
    fontSize: 24,
    textAlign: "center",
  },
};

export default function HomePage() {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>
      <div style={styles.container}>
        <h1 style={styles.title}>
          Phonebook welcome page{" "}
          <span role="img" aria-label="Greeting icon">
            💁‍♀️
          </span>
        </h1>
        <p style={styles.description}>
          With this application you can create and manage your own contact book
        </p>
      </div>
    </>
  );
}
