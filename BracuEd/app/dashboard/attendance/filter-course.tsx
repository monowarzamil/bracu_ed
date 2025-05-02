"use client";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function FilterCourse({ courses }: { courses: Course[] }) {
  const timeSchedules = [
    { value: "8:00-9:20", label: "8:00 AM - 9:20 AM" },
    { value: "9:30-10:50", label: "9:30 AM - 10:50 AM" },
    { value: "11:00-12:20", label: "11:00 AM - 12:20 PM" },
    { value: "12:30-2:00", label: "12:30 PM - 2:00 PM" },
    { value: "2:00-3:20", label: "2:00 PM - 3:20 PM" },
    { value: "3:30-4:50", label: "3:30 PM - 4:50 PM" },
  ];

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedTimeSchedule, setSelectedTimeSchedule] = useState<string>("");

  const router = useRouter();

  const handleApplyFilters = () => {
    if (!date || !selectedCourse || !selectedTimeSchedule) {
      alert("Please select all filter options");
      return;
    }
    const formattedDate = format(date, "yyyy-MM-dd");

    router.push(
      `/dashboard/attendance/take-attendance?date=${formattedDate}&courseId=${selectedCourse}&section=${selectedSection}&time=${selectedTimeSchedule}`
    );
  };
  return (
    <div>
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-4 gap-x-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Course Code</label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.courseCode.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Section</label>
              <Select
                value={selectedSection}
                onValueChange={setSelectedSection}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Section</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.section}>
                      {course.section.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Schedule</label>
              <Select
                value={selectedTimeSchedule}
                onValueChange={setSelectedTimeSchedule}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Times</SelectItem>
                  {timeSchedules.map((time) => (
                    <SelectItem key={time.value} value={time.value}>
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="my-4 flex justify-end">
            <Button className="w-full md:w-auto" onClick={handleApplyFilters}>
              Take Attendance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
