import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { BoxProps } from "@mui/material";


interface FlexBetweenProps extends BoxProps {
  backgroundColor?: string;
  borderRadius?: string;
  gap?: string;
  padding?: string;
}

const FlexBetween = styled(Box)<
  FlexBetweenProps
>(({ theme, backgroundColor, borderRadius, gap, padding }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: backgroundColor || theme.palette.neutral.light, 
  borderRadius,
  gap,
  padding,
}));



export default FlexBetween;