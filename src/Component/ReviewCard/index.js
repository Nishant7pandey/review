import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/system/Stack";
import FocusTrap from "@mui/base/FocusTrap";

export default function ReviewCard({
  keys,
  comment,
  title,
  friend,
  name,
  usefulness,
  rating,
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        minWidth:300,
        minHeight:400
      }}
      key={keys}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {friend && name.split(" ").slice(5, 7).join(" ")}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {usefulness} usefulness
        </Typography>
        <Typography variant="body2">{comment}</Typography>
      </CardContent>

      <CardActions sx={{ display: "flex", flexDirection: "column" }}>
        {/* <Button size="small">Learn More</Button> */}
        <Rating name="size-medium" defaultValue={rating.Overall} readOnly />
        <FocusTrap open={open} disableRestoreFocus disableAutoFocus>
          <Stack alignItems="center" spacing={2}>
            <button
              type="button"
              style={{ backgroundColor: "white", border: "0px", color: "blue" }}
              onClick={() => setOpen(!open)}
            >
              {open ? "showLess" : "showMore"}
            </button>
            {open && (
              <table>
                <tbody>
                <tr>
                  <td>Delivery Time :</td>
                  <td>
                    <Rating
                      name="size-medium"
                      defaultValue={rating.delivery_time}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td>Discount/offers:</td>
                  <td>
                    <Rating
                      name="size-medium"
                      defaultValue={rating.discounts_and_offers}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td>Description :</td>
                  <td>
                    <Rating
                      name="size-medium"
                      defaultValue={rating.matches_description}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td>Photo :</td>
                  <td>
                    <Rating
                      name="size-medium"
                      defaultValue={rating.matches_photo}
                      readOnly
                    />
                  </td>
                </tr>
                </tbody>
              </table>
            )}
          </Stack>
        </FocusTrap>
      </CardActions>
    </Card>
  );
}
