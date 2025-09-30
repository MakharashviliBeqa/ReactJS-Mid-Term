export default function Footer() {
    return (
        <footer
            style={{
                backgroundColor: "#f2f2f2",
                color: "black",
                padding: "20px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                <div style={{ display: "flex", gap: "20px" }}>
                    <span>Conditions to Use</span>
                    <span>Privacy Notice</span>
                    <span>Interest-based Ads</span>
                </div>

                <div>
                    &copy; 1996-2021, Amazon.com,Inc. or its affiliates
                </div>
            </div>
        </footer>
    );
}
