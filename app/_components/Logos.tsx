import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import CCSLogoLarge from "./CCSLogoLarge";

const Logos = () => {
  const router = useRouter();
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ zIndex: 1 }}
    >
      <Box
        onClick={() => router.push("/")}
        sx={{ width: { cursor: "pointer" } }}
      >
        <CCSLogoLarge />
      </Box>

      <img
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/")}
        src={"froshLogo.png"}
        alt="avatar"
        width={200}
        height={200}
      />
    </Box>
  );
};

export default Logos;
