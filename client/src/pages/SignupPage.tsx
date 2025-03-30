import { useState } from "react";
import {
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Box,
  Typography,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const [role, setRole] = useState("trucker");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    phone: "",
    mc_dot: "",
    carrierType: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
    address: "",
    password: "",
    fleetSize: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    username: "",
    password: "",
    phone: "",
    mc_dot: "",
    carrierType: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
    fleetSize: "",
    address: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors: any = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.mc_dot.trim()) newErrors.mc_dot = "MC/DOT is required";
    if (!formData.carrierType)
      newErrors.carrierType = "Carrier Type is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zipcode.trim()) newErrors.zipcode = "Zipcode is required";
    if (!formData.fleetSize.trim())
      newErrors.fleetSize = "Fleet Size is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  console.log(role);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/shipper/signup",
        formData
      );

      console.log("Signup Successful:", response.data);
      navigate("/login");
    } catch (error: any) {
      console.error("Signup Failed:", error.response?.data || error.message);
      alert(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <Box
      // maxWidth={false}
      sx={{
        display: "flex",
        // alignItems: "center",
        // justifyContent: "right",
        // minHeight: "100vh",
        // outline: "4px solid green",
        backgroundColor: "wheat",
      }}
    >
      <Box
        sx={{
          width: "50%",
          // outline: "1px solid red",
          objectFit: "center",
          // height: "100vh",
          backgroundImage:
            "url(https://s3-alpha-sig.figma.com/img/530f/c35f/94a927c3c99f86c32dc711f623281b1d?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GvTRAUiVALVoj50Fothe1sMyRHgPpk~X5oY8CFJO-c52Zpa5ik-GOOJZtdxXwc6Eb~O~gEkCfuCD5348Ibt-9vHugYjROt1-TFm3SBCFvP46Zo-KXXiMvcfCvd3lQZaPhR0eUjUJvVqvF1ZtFQu1bnbYr9FN6-KNc-srhFwGtTI0iFqQmVaDheqTbPkNJxGwA7oDKCfdeE4NztfSG1bTgj4FrRmMKhsF4VSMcuy92NqCC~IXDo~6jiyND8J9ILNQm5F4tDwiISWH3hdERYxpJBru24n4aaUNTHH5NuPxNpSHnTF6MzjhefWkWsKdgL0BWC~ULRcjonB-ySiSZZx5Yw__)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></Box>

      <Box sx={{ p: 3, width: "50%", backgroundColor: "white" }}>
        <img
          src="https://s3-alpha-sig.figma.com/img/e242/9461/578d3c32108676571a639f6b41c4a4fc?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ifaZqP6XTONNZfrJDxJWDOFYPqdw3XW98MSjmC7BKgNbjkShv2qiUSG2U46gf5mlj5ZDNa1VFxJO~~ScEsGFy9oN3L1kQQ4f8hwfqHuAcxWFNVSGA9lQJZ0fvMSAhm-o62xz6ooyY9VOhAaDr~0zUYAlf7-K4pSYu3keosEc23VYJ2PCTK1ViPz9SHPL9qvAUlu9-SWNcGLv4TK2GC4iY53qpkGI6asW0PbYn-sO6i4UH-2uzldgJ8kuBkXd7BPFHNtNoV3YiHoUNBXPXPxdyzkXi2ej-IiiQYFeOfQ2MHsDWbh29JaKn6fSsah4RN7ntN0uw2ZTW~Yk6niTRjFJdg__"
          alt="V Logistics"
          width={180}
          height={100}
          style={{ objectFit: "cover" }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ mx: 2 }}
            variant="h4"
            fontWeight="bold"
            gutterBottom
          >
            Sign up as
          </Typography>
          <Typography
            sx={{ fontSize: "15px", color: "grey", cursor: "pointer", mt: 1 }}
          >
            <Link to={"/login"}>Back</Link>
          </Typography>
        </Box>
        <ToggleButtonGroup
          value={role}
          exclusive
          onChange={(_, newRole) => newRole && setRole(newRole)}
          sx={{ mb: 1, mx: 2 }}
        >
          <ToggleButton
            value="trucker"
            sx={{
              "&.Mui-selected": {
                backgroundColor: "black",
                color: "white",
                "&:hover": { backgroundColor: "black" },
              },
              px: 2,
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
              px: 2,
              py: 0.4,
              borderRadius: 2,
            }}
          >
            Shipper
          </ToggleButton>
        </ToggleButtonGroup>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="fullName"
            size="small"
            margin="dense"
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              setErrors({ ...errors, fullName: "" });
            }}
            error={!!errors.fullName}
            helperText={errors.fullName}
            sx={{ mb: 1, mx: 2, p: 0 }}
          />
          <TextField
            label="MC/DOT"
            name="mcDot"
            size="small"
            margin="dense"
            onChange={(e) => {
              setFormData({ ...formData, mc_dot: e.target.value });
              setErrors({ ...errors, mc_dot: "" });
            }}
            error={!!errors.mc_dot}
            helperText={errors.mc_dot}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Phone No"
            name="phone"
            size="small"
            margin="dense"
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              setErrors({ ...errors, phone: "" });
            }}
            error={!!errors.phone}
            helperText={errors.phone}
            sx={{ mb: 1, mx: 2 }}
          />
          <FormControl
            sx={{
              mt: 1,
              minWidth: 230,
              "& .MuiSelect-select": {
                py: 1,
                textAlign: "center",
              },
            }}
          >
            <InputLabel id="carrier-select-label">Select Carrier</InputLabel>
            <Select
              labelId="carrier-select-label"
              id="carrier-select"
              name="carrierType"
              value={formData.carrierType || ""}
              onChange={(e) => {
                setFormData({ ...formData, carrierType: e.target.value });
                setErrors({ ...errors, carrierType: "" });
              }}
            >
              <MenuItem value="Type1">Type 1</MenuItem>
              <MenuItem value="Type2">Type 2</MenuItem>
              <MenuItem value="Type3">Type 3</MenuItem>
            </Select>
            <FormHelperText>{errors.carrierType}</FormHelperText>
          </FormControl>

          <TextField
            label="Country"
            name="country"
            size="small"
            margin="dense"
            onChange={(e) => {
              setFormData({ ...formData, country: e.target.value });
              setErrors({ ...errors, country: "" });
            }}
            error={!!errors.country}
            helperText={errors.country}
            sx={{ mb: 1, mx: 2 }}
          />
          <TextField
            label="Zip Code"
            name="zipCode"
            size="small"
            margin="dense"
            onChange={(e) => {
              setFormData({ ...formData, zipcode: e.target.value });
              setErrors({ ...errors, zipcode: "" });
            }}
            error={!!errors.zipcode}
            helperText={errors.zipcode}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Fleet"
            name="fleet"
            size="small"
            margin="dense"
            onChange={(e) => {
              setFormData({ ...formData, fleetSize: e.target.value });
              setErrors({ ...errors, fleetSize: "" });
            }}
            error={!!errors.fleetSize}
            helperText={errors.fleetSize}
            sx={{ mb: 1, mx: 2 }}
          />
          <TextField
            label="State"
            name="state"
            size="small"
            margin="dense"
            onChange={(e) => {
              setFormData({ ...formData, state: e.target.value });
              setErrors({ ...errors, state: "" });
            }}
            error={!!errors.state}
            helperText={errors.state}
            sx={{ mb: 1 }}
          />
          <TextField
            label="City"
            name="city"
            size="small"
            margin="dense"
            onChange={(e) => {
              setFormData({ ...formData, city: e.target.value });
              setErrors({ ...errors, city: "" });
            }}
            error={!!errors.city}
            helperText={errors.city}
            sx={{ mb: 1, mx: 2 }}
          />

          <TextField
            label="Full Address"
            name="address"
            size="small"
            margin="dense"
            onChange={(e) => {
              setFormData({ ...formData, address: e.target.value });
              setErrors({ ...errors, address: "" });
            }}
            error={!!errors.address}
            helperText={errors.address}
            sx={{ mb: 1, mx: 2, width: "88%" }}
          />
          <Box sx={{ display: "flex" }}>
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
              sx={{ mb: 1, mx: 2 }}
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
              sx={{ mb: 1, width: "43%" }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ display: "block", margin: "auto", width: "40%" }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
