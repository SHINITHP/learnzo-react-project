import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useGetCategoriesQuery } from "@/services/courseApi";

export interface FilterState {
  categories: string[];
  difficulty: string[];
  price: string[];
  duration: string[];
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  className?: string;
}

const filterOptions = {
  categories: [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "Design",
    "Business",
    "Programming",
    "Marketing",
  ],
  difficulty: ["Beginner", "Intermediate", "Advanced"],
  price: ["Free", "Paid"],
  duration: ["Short (< 5 hours)", "Medium (5-20 hours)", "Long (20+ hours)"],
};

export const FilterPanel = ({
  filters,
  onFiltersChange,
  onClearFilters,
  className = "",
}: FilterPanelProps) => {
  const { data, isLoading, error } = useGetCategoriesQuery();
  const categories = data?.data || [];

  const handleFilterChange = (
    filterType: keyof FilterState,
    value: string,
    checked: boolean
  ) => {
    const newFilters = { ...filters };
    if (checked) {
      newFilters[filterType] = [...newFilters[filterType], value];
    } else {
      newFilters[filterType] = newFilters[filterType].filter(
        (item) => item !== value
      );
    }
    onFiltersChange(newFilters);
  };

  const hasActiveFilters = Object.values(filters).some((arr) => arr.length > 0);

  const activeFiltersCount = Object.values(filters).reduce(
    (acc, arr) => acc + arr.length,
    0
  );

  return (
    <Card className={`${className} py-6 rounded-lg`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Badge variant="secondary" className="w-fit">
            {activeFiltersCount} active
          </Badge>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Category</Label>
          <div className="space-y-2">
            {filterOptions.categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  className="border border-gray-500"
                  onCheckedChange={(checked) =>
                    handleFilterChange(
                      "categories",
                      category,
                      checked as boolean
                    )
                  }
                />
                <Label
                  htmlFor={`category-${category}`}
                  className="text-sm text-gray-800 hover:text-foreground cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="border-b border-b-gray-400" />

        {/* Difficulty Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Difficulty Level
          </Label>
          <div className="space-y-2">
            {filterOptions.difficulty.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={`difficulty-${level}`}
                  checked={filters.difficulty.includes(level)}
                  className="border border-gray-500"
                  onCheckedChange={(checked) =>
                    handleFilterChange("difficulty", level, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`difficulty-${level}`}
                  className="text-sm text-gray-800 hover:text-foreground cursor-pointer"
                >
                  {level}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="border-b border-b-gray-400" />

        {/* Price Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Price</Label>
          <div className="space-y-2">
            {filterOptions.price.map((priceType) => (
              <div key={priceType} className="flex items-center space-x-2">
                <Checkbox
                  id={`price-${priceType}`}
                  checked={filters.price.includes(priceType)}
                  className="border border-gray-500"
                  onCheckedChange={(checked) =>
                    handleFilterChange("price", priceType, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`price-${priceType}`}
                  className="text-sm text-gray-800 hover:text-foreground cursor-pointer"
                >
                  {priceType}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="border-b border-b-gray-400" />

        {/* Duration Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Duration</Label>
          <div className="space-y-2">
            {filterOptions.duration.map((duration) => (
              <div key={duration} className="flex items-center space-x-2">
                <Checkbox
                  id={`duration-${duration}`}
                  checked={filters.duration.includes(duration)}
                  className="border border-gray-500"
                  onCheckedChange={(checked) =>
                    handleFilterChange("duration", duration, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`duration-${duration}`}
                  className="text-sm text-gray-800 hover:text-foreground cursor-pointer"
                >
                  {duration}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
