import { useState } from "react";
import {
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [role, setRole] = useState("trucker");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  console.log(role);
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors: any = {};

    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log(formData);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/${role}/login`,
        {
          username: formData.username,
          password: formData.password,
        }
      );

      console.log("Login Successful:", response.data);

      role === "trucker" ? navigate("/trucker") : navigate("/");

      localStorage.setItem("token", response.data.token);
    } catch (error: any) {
      console.error("Login Failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <Box
      // maxWidth={false}
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: "65%",
          // outline: "1px solid red",
          objectFit: "center",
          height: "100vh",
          backgroundImage:
            "url(https://s3-alpha-sig.figma.com/img/530f/c35f/94a927c3c99f86c32dc711f623281b1d?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GvTRAUiVALVoj50Fothe1sMyRHgPpk~X5oY8CFJO-c52Zpa5ik-GOOJZtdxXwc6Eb~O~gEkCfuCD5348Ibt-9vHugYjROt1-TFm3SBCFvP46Zo-KXXiMvcfCvd3lQZaPhR0eUjUJvVqvF1ZtFQu1bnbYr9FN6-KNc-srhFwGtTI0iFqQmVaDheqTbPkNJxGwA7oDKCfdeE4NztfSG1bTgj4FrRmMKhsF4VSMcuy92NqCC~IXDo~6jiyND8J9ILNQm5F4tDwiISWH3hdERYxpJBru24n4aaUNTHH5NuPxNpSHnTF6MzjhefWkWsKdgL0BWC~ULRcjonB-ySiSZZx5Yw__)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></Box>

      <Box sx={{ p: 5, width: "35%", backgroundColor: "white" }}>
        <img
          src="https://s3-alpha-sig.figma.com/img/e242/9461/578d3c32108676571a639f6b41c4a4fc?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ifaZqP6XTONNZfrJDxJWDOFYPqdw3XW98MSjmC7BKgNbjkShv2qiUSG2U46gf5mlj5ZDNa1VFxJO~~ScEsGFy9oN3L1kQQ4f8hwfqHuAcxWFNVSGA9lQJZ0fvMSAhm-o62xz6ooyY9VOhAaDr~0zUYAlf7-K4pSYu3keosEc23VYJ2PCTK1ViPz9SHPL9qvAUlu9-SWNcGLv4TK2GC4iY53qpkGI6asW0PbYn-sO6i4UH-2uzldgJ8kuBkXd7BPFHNtNoV3YiHoUNBXPXPxdyzkXi2ej-IiiQYFeOfQ2MHsDWbh29JaKn6fSsah4RN7ntN0uw2ZTW~Yk6niTRjFJdg__"
          alt="V Logistics"
          width={180}
          height={100}
          style={{ objectFit: "cover" }}
        />
        <Typography sx={{ mx: 2 }} variant="h4" fontWeight="bold" gutterBottom>
          Login as
        </Typography>
        <ToggleButtonGroup
          value={role}
          exclusive
          onChange={(_, newRole) => newRole && setRole(newRole)}
          sx={{ mb: 1, marginLeft: "2rem" }}
        >
          <ToggleButton
            value="trucker"
            sx={{
              "&.Mui-selected": {
                backgroundColor: "black",
                color: "white",
                "&:hover": { backgroundColor: "black" },
              },
              px: 4,
              py: 0.4,
              borderRadius: 2,
            }}
          >
            Trucker
          </ToggleButton>

          <ToggleButton
            value="shipper"
            sx={{
              "&.Mui-selected": {
                backgroundColor: "black",
                color: "white",
                "&:hover": { backgroundColor: "black" },
              },
              px: 4,
              py: 0.4,
              borderRadius: 2,
            }}
          >
            Shipper
          </ToggleButton>
        </ToggleButtonGroup>

        <Box component="form" onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              label="Username"
              name="username"
              size="small"
              margin="dense"
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
                setErrors({ ...errors, username: "" });
              }}
              error={!!errors.username}
              helperText={errors.username}
              sx={{ mb: 1, width: "75%" }}
            />
            <TextField
              label="Password"
              name="password"
              size="small"
              margin="dense"
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setErrors({ ...errors, password: "" });
              }}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 1, width: "75%" }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ display: "block", margin: "auto", width: "40%" }}
          >
            Login
          </Button>
          <Typography
            sx={{ fontSize: "12px", color: "gray", cursor: "pointer", mt: 1 }}
          >
            Didn't Signup yet? <Link to={"/signup"}>Sign Up Now!</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
