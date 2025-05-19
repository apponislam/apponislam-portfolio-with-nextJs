"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface CalendarProps {
    className?: string;
    mode?: "single" | "range";
    selected?: Date;
    onSelect?: (date?: Date) => void;
    disabled?: (date: Date) => boolean;
    initialFocus?: boolean;
    showOutsideDays?: boolean;
}

function Calendar({ className, mode = "single", selected, onSelect, disabled, initialFocus, showOutsideDays = true, ...props }: CalendarProps) {
    const [internalDate, setInternalDate] = React.useState<Date | null>(selected || null);

    React.useEffect(() => {
        setInternalDate(selected || null);
    }, [selected]);

    const handleDateChange = (date: Date | null) => {
        setInternalDate(date);
        if (onSelect) {
            onSelect(date || undefined);
        }
    };

    const CustomNextButton = React.useCallback(
        ({ ownerState, ...props }: any) => (
            <button className={cn(buttonVariants({ variant: "outline" }), "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1")} {...props}>
                <ChevronRight className="size-4" />
            </button>
        ),
        []
    );

    const CustomPrevButton = React.useCallback(
        ({ ownerState, ...props }: any) => (
            <button className={cn(buttonVariants({ variant: "outline" }), "size-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1")} {...props}>
                <ChevronLeft className="size-4" />
            </button>
        ),
        []
    );

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className={cn("p-3", className)}>
                <DateCalendar
                    value={internalDate}
                    onChange={handleDateChange}
                    showDaysOutsideCurrentMonth={showOutsideDays}
                    shouldDisableDate={disabled}
                    slots={{
                        nextIconButton: CustomNextButton,
                        previousIconButton: CustomPrevButton,
                    }}
                    sx={{
                        width: "100%",
                        color: "hsl(var(--foreground))", // Text color for both modes
                        "& .MuiPickersCalendarHeader-root": {
                            position: "relative",
                            marginBottom: "1rem",
                        },
                        "& .MuiPickersCalendarHeader-label": {
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            color: "hsl(var(--foreground))",
                        },
                        "& .MuiDayCalendar-weekContainer": {
                            justifyContent: "space-between",
                            marginTop: "0.5rem",
                        },
                        "& .MuiDayCalendar-weekDayLabel": {
                            width: 36,
                            height: 36,
                            fontSize: "0.8rem",
                            color: "hsl(var(--muted-foreground))",
                            fontWeight: 400,
                        },
                        "& .MuiPickersDay-root": {
                            width: 36,
                            height: 36,
                            fontSize: "0.875rem",
                            fontWeight: 400,
                            margin: 0,
                            color: "hsl(var(--foreground))",
                            "&.Mui-selected": {
                                backgroundColor: "hsl(var(--primary))",
                                color: "hsl(var(--primary-foreground))",
                                "&:hover, &:focus": {
                                    backgroundColor: "hsl(var(--primary)/0.9)",
                                },
                            },
                            "&.MuiPickersDay-today": {
                                borderColor: "hsl(var(--border))",
                                backgroundColor: "hsl(var(--accent))",
                                color: "hsl(var(--accent-foreground))",
                            },
                            "&.Mui-disabled": {
                                color: "hsl(var(--muted-foreground))",
                                opacity: 0.5,
                            },
                            "&.MuiPickersDay-dayOutsideMonth": {
                                color: "hsl(var(--muted-foreground))",
                            },
                        },
                        // Dark mode specific overrides
                        "& .MuiPickersArrowSwitcher-button": {
                            color: "hsl(var(--foreground))",
                        },
                    }}
                    {...props}
                />
            </div>
        </LocalizationProvider>
    );
}

export { Calendar };
