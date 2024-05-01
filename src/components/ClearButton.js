function ClearButton() {
    return (
        <button
            onClick={() => {
                if (window.confirm("Are you sure you want to clear your data?") === true) {
                    localStorage.clear();
                    window.location.reload();
                }
            }}

            style={{
                right: "0",
                padding: "10px",
                backgroundColor: "#f54242",
                color: "white",
                border: "none",
                fontFamily: "MuseoModerno",
                fontWeight: "bold",
                borderRadius: "2px"
            }}
        >
            Clear Data
        </button>
    );
}

export default ClearButton;