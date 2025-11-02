import React, { useState, useMemo, useRef } from "react";
import {
  Button,
  Popover,
  List,
  ListItemButton,
  Avatar,
  Typography,
  Box,
  ListItemAvatar,
  ListItemText,
  TextField,
  CircularProgress,
} from "@mui/material";
import { ExpandMore, Check } from "@mui/icons-material";

export interface MealItem {
  Meal_ID: string;
  Meal_Name: string;
  ImageUrl?: string;
}

interface MealSelectDropdownProps {
  mealList: MealItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
  disabledIds?: string[];
  pageSize?: number;
}

export default function MealSelectDropdown({
  mealList,
  selectedId,
  onSelect,
  disabledIds = [],
  pageSize = 20,
}: MealSelectDropdownProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const selected = mealList.find((m) => m.Meal_ID === selectedId);

  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [loading, setLoading] = useState(false);

  // --- Tìm kiếm và lọc trùng ---
  const filteredMeals = useMemo(() => {
    const lower = search.toLowerCase();
    return mealList.filter(
      (m) =>
        m.Meal_Name.toLowerCase().includes(lower) &&
        (selectedId === m.Meal_ID || !disabledIds.includes(m.Meal_ID))
    );
  }, [mealList, search, disabledIds, selectedId]);

  const visibleMeals = useMemo(
    () => filteredMeals.slice(0, visibleCount),
    [filteredMeals, visibleCount]
  );

  // --- Lazy loading ---
  const handleScroll = () => {
    const el = listRef.current;
    if (!el || loading) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
    if (nearBottom && visibleCount < filteredMeals.length) {
      setLoading(true);
      setTimeout(() => {
        setVisibleCount((prev) => prev + pageSize);
        setLoading(false);
      }, 500);
    }
  };

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (disabledIds.includes(id) && id !== selectedId) return;
    onSelect(id);
    handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleOpen}
        className="text-[var(--color-primary)] hover:text-[var(--color-primary-light)]"
        sx={{
          width: "100%",
          justifyContent: "space-between",
          textTransform: "none",
          borderRadius: 2,
          p: 1.5,
          borderColor: "white",
          "&:hover": { borderColor: "var(--color-primary-light)" },
        }}
      >
        {selected ? (
          <Box display="flex" alignItems="center" gap={1.5}>
            <Avatar src={selected.ImageUrl} sx={{ width: 32, height: 32 }} />
            <Typography noWrap className="text-[var(--color-primary)]">
              {selected.Meal_Name}
            </Typography>
          </Box>
        ) : (
          <Typography className="text-[var(--color-primary)]">
            Select meal…
          </Typography>
        )}
        <ExpandMore fontSize="small" className="text-[var(--color-primary)] opacity-60" />
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: { borderRadius: 2, mt: 1, boxShadow: 6, zIndex: 2000 },
          },
        }}
      >
        <Box sx={{ p: 1, pb: 0.5 }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Search meals..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(pageSize);
            }}
          />
        </Box>

        <List
          ref={listRef}
          onScroll={handleScroll}
          sx={{
            minWidth: 260,
            maxHeight: 300,
            overflowY: "auto",
          }}
        >
          {visibleMeals.map((meal) => {
            const isDisabled = disabledIds.includes(meal.Meal_ID) && meal.Meal_ID !== selectedId;
            const isSelected = selectedId === meal.Meal_ID;

            return (
              <ListItemButton
                key={meal.Meal_ID}
                disabled={isDisabled}
                selected={isSelected}
                onClick={(e) => handleSelect(e, meal.Meal_ID)}
                sx={{
                  opacity: isDisabled ? 0.5 : 1,
                  "&.Mui-selected": {
                    backgroundColor: "rgba(178, 14, 16, 0.15)",
                    "&:hover": {
                      backgroundColor: "rgba(178, 14, 16, 0.25)",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "rgba(178, 14, 16, 0.1)",
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar src={meal.ImageUrl} sx={{ width: 42, height: 42 }} />
                </ListItemAvatar>
                <ListItemText
                  primary={meal.Meal_Name}
                  secondary={meal.Meal_ID}
                  primaryTypographyProps={{ fontWeight: 500, fontSize: "0.95rem" }}
                  secondaryTypographyProps={{ fontSize: "0.8rem" }}
                />
                {isSelected && <Check sx={{ color: "#b20e10" }} fontSize="small" />}
              </ListItemButton>
            );
          })}

          {loading && (
            <Box display="flex" justifyContent="center" p={1.5}>
              <CircularProgress size={22} />
            </Box>
          )}

          {!loading && visibleMeals.length === 0 && (
            <Box textAlign="center" p={2}>
              <Typography variant="body2" color="text.secondary">
                No meals found
              </Typography>
            </Box>
          )}
        </List>
      </Popover>
    </>
  );
}
