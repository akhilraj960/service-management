"use client";

import { useEffect, useState } from "react";
import { ServiceManForm } from "@/components/forms/service-man-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Wrapper } from "@/components/wrapper";
import axios from "axios";

export default function ServiceMan() {
  const [serviceMen, setServiceMen] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editServiceMan, setEditServiceMan] = useState(null);

  // Fetch service men from the API
  const fetchServiceMen = async () => {
    try {
      const response = await axios.get("/api/serviceman");
      setServiceMen(response.data);
    } catch (error) {
      console.error("Error fetching servicemen:", error);
    }
  };

  useEffect(() => {
    fetchServiceMen();
  }, []);

  // Handle form submission for creating or updating a service man

  return (
    <Wrapper>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Service Men</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditServiceMan(null)}>
                Add Service Man
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editServiceMan ? "Edit Service Man" : "Add Service Man"}
                </DialogTitle>
                <DialogDescription>
                  {editServiceMan
                    ? "Edit the service man details below."
                    : "Fill in the details below to add a new service man."}
                </DialogDescription>
              </DialogHeader>
              <ServiceManForm />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviceMen.map((man, index) => (
                <TableRow key={man._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{man.name}</TableCell>
                  <TableCell>{man.email}</TableCell>
                  <TableCell>{man.phone}</TableCell>
                  <TableCell>{man.age}</TableCell>
                  <TableCell>{man.gender}</TableCell>
                  <TableCell>{man.category}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="secondary">Edit</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Service Man</DialogTitle>
                          <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <ServiceManForm value={man} />
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      onClick={async () => {
                        try {
                          await axios.delete(`/api/serviceman/${man._id}`);
                          setServiceMen((prev) =>
                            prev.filter(
                              (serviceMan) => serviceMan._id !== man._id
                            )
                          );
                        } catch (error) {
                          console.error("Error deleting service man:", error);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Wrapper>
  );
}
