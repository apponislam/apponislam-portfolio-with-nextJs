import { Star } from "lucide-react";
import { Button } from "./button";

interface RatingProps {
    value: number;
    onChange: (value: number) => void;
    max?: number;
}

export function Rating({ value, onChange, max = 5 }: RatingProps) {
    return (
        <div className="flex items-center gap-1">
            {[...Array(max)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                    <Button key={i} type="button" variant="ghost" size="icon" onClick={() => onChange(ratingValue)} className="h-8 w-8 p-0">
                        <Star className={`h-5 w-5 ${ratingValue <= value ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                    </Button>
                );
            })}
        </div>
    );
}
