
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Heading1, 
  Heading2, 
  Link2,
  Undo,
  Redo,
  Image
} from "lucide-react";

export const ContentEditorToolbar: React.FC = () => {
  return (
    <div className="border border-border rounded-t-lg bg-muted/50 p-2 flex flex-wrap gap-1">
      <div className="flex gap-1 mr-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Undo className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Redo className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="h-8 w-px bg-border mx-1"></div>

      <div className="flex gap-1 mr-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Underline className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="h-8 w-px bg-border mx-1"></div>

      <div className="flex gap-1 mr-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Heading2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="h-8 w-px bg-border mx-1"></div>

      <div className="flex gap-1 mr-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="h-8 w-px bg-border mx-1"></div>

      <div className="flex gap-1 mr-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="h-8 w-px bg-border mx-1"></div>

      <div className="flex gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Link2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Image className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
