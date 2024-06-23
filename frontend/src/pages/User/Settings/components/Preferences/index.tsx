import { useGetAccount, useUpdateAccount } from "@api/auth";
import { LoadingButton } from "@mui/lab";
import { Box, Switch, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
type PreferenceType = {
  temperatureRange: {
    active: boolean;
    min: number;
    max: number;
  };
  humidityRange: {
    active: boolean;
    min: number;
    max: number;
  };
  emailGas: boolean;
  emailVibration: boolean;
};
const Preferences = () => {
  const { data: account } = useGetAccount();
  const prefernces = account?.preferences;
  const { mutate: updateAccount, isLoading: updatingAccount } =
    useUpdateAccount();
  const formik = useFormik<PreferenceType>({
    initialValues: {
      temperatureRange: {
        active: prefernces?.temperatureRange?.active || false,
        min: prefernces?.temperatureRange?.min || 0,
        max: prefernces?.temperatureRange?.max || 0,
      },
      humidityRange: {
        active: prefernces?.humidityRange?.active || false,
        min: prefernces?.humidityRange?.min || 0,
        max: prefernces?.humidityRange?.max || 0,
      },
      emailGas: prefernces?.emailGas || false,
      emailVibration: prefernces?.emailVibration || false,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      updateAccount({ preferences: values });
    },
  });
  return (
    <Box
      sx={{
        borderRadius: "16px",
        border: "1px solid",
        borderColor: (theme) => theme.common.border,
        backgroundColor: "background.paper",
        my: "16px",
        p: "16px",
        maxWidth: "600px",
      }}
    >
      <Box>
        <Typography variant="h6" color="text.primary">
          Preferences
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select your prefernces below.
        </Typography>
      </Box>
      <Box
        mt="16px"
        className="f-column"
        gap="8px"
        component="form"
        onSubmit={formik.handleSubmit}
      >
        {/* **************** email gas **************** */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography>Email me when there is a gas leak.</Typography>
          <Switch
            onChange={(e) => formik.setFieldValue("emailGas", e.target.checked)}
            checked={formik.values.emailGas}
          />
        </Box>
        {/* **************** email vibration **************** */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography>Email me when there is a vibration.</Typography>
          <Switch
            onChange={(e) =>
              formik.setFieldValue("emailVibration", e.target.checked)
            }
            checked={formik.values.emailVibration}
          />
        </Box>
        {/* **************** email temperature **************** */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb="8px"
        >
          <Box>
            <Typography mb="8px">
              Email me when the temperature is not in the range
            </Typography>
            <Box display="flex" gap="16px" alignItems="center">
              <TextField
                placeholder="min"
                sx={{ maxWidth: "70px" }}
                value={formik.values.temperatureRange.min}
                disabled={!formik.values.temperatureRange.active}
                onChange={(e) =>
                  formik.setFieldValue("temperatureRange", {
                    ...formik.values.temperatureRange,
                    min: e.target.value,
                  })
                }
              />
              -
              <TextField
                placeholder="max"
                sx={{ maxWidth: "70px" }}
                value={formik.values.temperatureRange.max}
                disabled={!formik.values.temperatureRange.active}
                onChange={(e) =>
                  formik.setFieldValue("temperatureRange", {
                    ...formik.values.temperatureRange,
                    max: e.target.value,
                  })
                }
              />
            </Box>
          </Box>
          <Switch
            onChange={(e) =>
              formik.setFieldValue("temperatureRange", {
                ...formik.values.temperatureRange,
                active: e.target.checked,
              })
            }
            checked={formik.values.temperatureRange.active}
          />
        </Box>
        {/* **************** email humidity **************** */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography mb="8px">
              Email me when the humidity is not in the range
            </Typography>
            <Box display="flex" gap="16px" alignItems="center">
              <TextField
                placeholder="min"
                sx={{ maxWidth: "70px" }}
                value={formik.values.humidityRange.min}
                disabled={!formik.values.humidityRange.active}
                onChange={(e) =>
                  formik.setFieldValue("humidityRange", {
                    ...formik.values.humidityRange,
                    min: e.target.value,
                  })
                }
              />
              -
              <TextField
                placeholder="max"
                sx={{ maxWidth: "70px" }}
                value={formik.values.humidityRange.max}
                disabled={!formik.values.humidityRange.active}
                onChange={(e) =>
                  formik.setFieldValue("humidityRange", {
                    ...formik.values.humidityRange,
                    max: e.target.value,
                  })
                }
              />
            </Box>
          </Box>
          <Switch
            onChange={(e) =>
              formik.setFieldValue("humidityRange", {
                ...formik.values.humidityRange,
                active: e.target.checked,
              })
            }
            checked={formik.values.humidityRange.active}
          />
        </Box>
        <LoadingButton
          variant="outlined"
          type="submit"
          loading={updatingAccount}
          sx={{
            alignSelf: "flex-end",
            width: "fit-content",
            mt: "16px",
          }}
        >
          Save Changes
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Preferences;
